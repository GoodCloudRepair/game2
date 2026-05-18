import { _decorator, Component, Node, Prefab, Vec3, instantiate } from 'cc';
import { Monster, MonsterTier } from './Monster';
const { ccclass, property } = _decorator;

interface WaveConfig {
    normalCount: number;
    eliteCount: number;
    spawnInterval: number;
    duration: number;
}

/** 怪物生成器：按波次在屏幕外刷怪 */
@ccclass('MonsterSpawner')
export class MonsterSpawner extends Component {
    @property(Prefab)
    private readonly normalPrefab: Prefab | null = null;

    @property(Prefab)
    private readonly elitePrefab: Prefab | null = null;

    @property(Prefab)
    private readonly bossPrefab: Prefab | null = null;

    @property(Node)
    private readonly playerNode: Node | null = null;

    @property
    private readonly spawnRadius: number = 500; // 屏幕外刷新距离

    private _waves: WaveConfig[] = [];
    private _currentWave: number = 0;
    private _spawnTimer: number = 0;
    private _waveTimer: number = 0;
    private _spawning: boolean = false;
    private _stageLevel: number = 1;
    private readonly _activeMonsters: Monster[] = [];

    public get activeMonsters(): readonly Monster[] { return this._activeMonsters; }
    public get currentWave(): number { return this._currentWave; }
    public get totalWaves(): number { return this._waves.length; }

    /** 初始化波次配置 */
    public startSpawning(waves: WaveConfig[], stageLevel: number): void {
        this._waves = waves;
        this._stageLevel = stageLevel;
        this._currentWave = 0;
        this._spawning = true;
        this._spawnTimer = 0;
        this._waveTimer = 0;
    }

    public stop(): void {
        this._spawning = false;
    }

    protected update(dt: number): void {
        if (!this._spawning || this._currentWave >= this._waves.length) return;

        const wave = this._waves[this._currentWave];
        this._waveTimer += dt;
        this._spawnTimer += dt;

        // 按间隔刷怪
        if (this._spawnTimer >= wave.spawnInterval) {
            this._spawnTimer = 0;
            this.spawnWaveMonsters(wave);
        }

        // 波次时间到，进入下一波
        if (this._waveTimer >= wave.duration) {
            this._waveTimer = 0;
            this._spawnTimer = 0;
            this._currentWave++;
            this.node.emit('wave-changed', this._currentWave, this._waves.length);
        }
    }

    private spawnWaveMonsters(wave: WaveConfig): void {
        // 每次刷新间隔生成一批
        const normalPerTick = Math.ceil(wave.normalCount / (wave.duration / wave.spawnInterval));
        for (let i = 0; i < normalPerTick; i++) {
            this.spawnOne('normal');
        }
        // 精英按概率出现
        if (wave.eliteCount > 0 && Math.random() < wave.eliteCount / (wave.duration / wave.spawnInterval)) {
            this.spawnOne('elite');
        }
    }

    public spawnBoss(): void {
        this.spawnOne('boss');
    }

    private spawnOne(tier: MonsterTier): void {
        const prefab = tier === 'boss' ? this.bossPrefab :
                       tier === 'elite' ? this.elitePrefab : this.normalPrefab;
        if (!prefab || !this.playerNode) return;

        const node = instantiate(prefab);
        this.node.addChild(node);
        node.setPosition(this.getSpawnPos());

        const monster = node.getComponent(Monster);
        if (!monster) return;

        // 数值按关卡递增
        const mult = 1 + (this._stageLevel - 1) * 0.25;
        const configs = { normal: [30, 5, 80, 1, 2], elite: [200, 15, 60, 8, 15], boss: [2000, 30, 50, 50, 100] };
        const [hp, atk, spd, exp, gold] = configs[tier];

        monster.init(
            Math.floor(hp * mult), Math.floor(atk * mult), spd,
            Math.floor(exp * (1 + (this._stageLevel - 1) * 0.15)),
            Math.floor(gold * (1 + (this._stageLevel - 1) * 0.2)),
            tier, this.playerNode
        );

        node.on('monster-dead', this.onMonsterDead, this);
        this._activeMonsters.push(monster);
    }

    private onMonsterDead(monster: Monster): void {
        const idx = this._activeMonsters.indexOf(monster);
        if (idx >= 0) this._activeMonsters.splice(idx, 1);
        this.node.emit('monster-killed', monster);
        monster.node.off('monster-dead', this.onMonsterDead, this);
        monster.node.destroy(); // TODO: 改为对象池回收
    }

    private getSpawnPos(): Vec3 {
        // 屏幕外随机位置（圆形分布）
        const angle = Math.random() * Math.PI * 2;
        const px = this.playerNode!.position.x + Math.cos(angle) * this.spawnRadius;
        const py = this.playerNode!.position.y + Math.sin(angle) * this.spawnRadius;
        return new Vec3(px, py, 0);
    }
}

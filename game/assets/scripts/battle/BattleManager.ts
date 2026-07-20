import { _decorator, Component, Node } from 'cc';
import { MonsterSpawner } from './MonsterSpawner';
import { CollisionSystem } from './CollisionSystem';
import { LevelSystem } from './LevelSystem';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

export enum BattleState { Ready, Fighting, BossWave, Victory, Defeat }

/** 战斗流程管理：波次推进→Boss→结算 */
@ccclass('BattleManager')
export class BattleManager extends Component {
    @property(MonsterSpawner)
    private readonly spawner: MonsterSpawner | null = null;

    @property(CollisionSystem)
    private readonly collision: CollisionSystem | null = null;

    @property(LevelSystem)
    private readonly levelSystem: LevelSystem | null = null;

    @property(PlayerController)
    private readonly player: PlayerController | null = null;

    @property(Node)
    private readonly playerNode: Node | null = null;

    private _state: BattleState = BattleState.Ready;
    private _stageLevel: number = 1;
    private _goldEarned: number = 0;

    public get state(): BattleState { return this._state; }
    public get goldEarned(): number { return this._goldEarned; }

    /** 开始战斗 */
    public startBattle(stageLevel: number): void {
        this._stageLevel = stageLevel;
        this._goldEarned = 0;
        this._state = BattleState.Fighting;

        this.levelSystem?.reset();
        this.player?.init(200, 200, 2.0);

        // 标准8波配置
        const waves = [
            { normalCount: 8,  eliteCount: 0, spawnInterval: 3.0, duration: 30 },
            { normalCount: 12, eliteCount: 0, spawnInterval: 2.5, duration: 30 },
            { normalCount: 15, eliteCount: 1, spawnInterval: 2.0, duration: 30 },
            { normalCount: 20, eliteCount: 1, spawnInterval: 1.8, duration: 30 },
            { normalCount: 25, eliteCount: 2, spawnInterval: 1.5, duration: 30 },
            { normalCount: 30, eliteCount: 2, spawnInterval: 1.2, duration: 30 },
            { normalCount: 35, eliteCount: 3, spawnInterval: 1.0, duration: 30 },
        ];

        this.spawner?.startSpawning(waves, stageLevel);
        if (this.spawner) {
            this.collision?.setMonsters(this.spawner.activeMonsters as any);
        }

        this.registerEvents();
    }

    private registerEvents(): void {
        this.spawner?.node.on('wave-changed', this.onWaveChanged, this);
        this.spawner?.node.on('monster-killed', this.onMonsterKilled, this);
        this.playerNode?.on('player-dead', this.onPlayerDead, this);
    }

    private unregisterEvents(): void {
        this.spawner?.node.off('wave-changed', this.onWaveChanged, this);
        this.spawner?.node.off('monster-killed', this.onMonsterKilled, this);
        this.playerNode?.off('player-dead', this.onPlayerDead, this);
    }

    private onWaveChanged(current: number, total: number): void {
        this.node.emit('battle-wave', current, total);

        // 所有普通波结束，进入Boss波
        if (current >= total) {
            this._state = BattleState.BossWave;
            this.spawner?.stop();
            this.spawner?.spawnBoss();
            this.node.emit('battle-boss');
        }
    }

    private onMonsterKilled(monster: any): void {
        this._goldEarned += monster.goldReward;
        this.levelSystem?.addExp(monster.expReward);

        // Boss死亡 = 胜利
        if (monster.tier === 'boss' && this._state === BattleState.BossWave) {
            this.endBattle(BattleState.Victory);
        }
    }

    private onPlayerDead(): void {
        this.endBattle(BattleState.Defeat);
    }

    private endBattle(result: BattleState): void {
        this._state = result;
        this.spawner?.stop();
        this.unregisterEvents();
        this.node.emit('battle-end', result, this._goldEarned, this.levelSystem?.level ?? 1);
    }
}

import { AudioClip, AudioSource, _decorator } from 'cc';
import { Singleton } from './Singleton';

const { ccclass } = _decorator;

/**
 * 音频管理 — BGM/SFX 分离控制
 * 抖音小游戏音频限制：需用户交互后才能播放
 */
@ccclass('AudioManager')
export class AudioManager extends Singleton<AudioManager> {
    private _bgmSource: AudioSource | null = null;
    private _sfxSource: AudioSource | null = null;
    private _bgmVolume: number = 1.0;
    private _sfxVolume: number = 1.0;
    private _muted: boolean = false;

    protected onLoad(): void {
        super.onLoad();
        this._bgmSource = this.node.addComponent(AudioSource);
        this._sfxSource = this.node.addComponent(AudioSource);
        this._bgmSource.loop = true;
    }

    public playBGM(clip: AudioClip): void {
        if (!this._bgmSource) return;
        this._bgmSource.clip = clip;
        this._bgmSource.volume = this._muted ? 0 : this._bgmVolume;
        this._bgmSource.play();
    }

    public stopBGM(): void {
        this._bgmSource?.stop();
    }

    public playSFX(clip: AudioClip): void {
        if (!this._sfxSource || this._muted) return;
        this._sfxSource.playOneShot(clip, this._sfxVolume);
    }

    public setBGMVolume(vol: number): void {
        this._bgmVolume = vol;
        if (this._bgmSource && !this._muted) {
            this._bgmSource.volume = vol;
        }
    }

    public setSFXVolume(vol: number): void {
        this._sfxVolume = vol;
    }

    public setMute(muted: boolean): void {
        this._muted = muted;
        if (this._bgmSource) {
            this._bgmSource.volume = muted ? 0 : this._bgmVolume;
        }
    }

    public get isMuted(): boolean {
        return this._muted;
    }
}

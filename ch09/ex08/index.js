// 状態
export const State = Object.freeze({
    NORMAL: Symbol("normal"),            // 通常
    ALARM_SET: Symbol("alarmSet"),       // アラームセット中
    ALARM_SOUNDING: Symbol("alarmSounding"), // アラーム鳴動中
    SNOOZING: Symbol("snoozing"),        // スヌーズ中
  });
  
  // アクション
  export const Action = Object.freeze({
    NONE: Symbol("none"),
    SOUND_ALARM: Symbol("soundAlarm"),
    STOP_ALARM: Symbol("stopAlarm"),
  });
  
  const pair = (action, state) => ({ action, state });
  
  // --- 各イベントを関数として定義 ---
  // 引数: prevState
  // 戻り値: { action, state }
  
  export const setAlarm = (s) => {
    switch (s) {
      case State.NORMAL:
        return pair(Action.NONE, State.ALARM_SET);
      default:
        return pair(Action.NONE, s);
    }
  };
  
  export const cancelAlarm = (s) => {
    switch (s) {
      case State.ALARM_SET:
        return pair(Action.NONE, State.NORMAL);
      case State.ALARM_SOUNDING:
        return pair(Action.STOP_ALARM, State.NORMAL);
      case State.SNOOZING:
        return pair(Action.NONE, State.NORMAL);
      default:
        return pair(Action.NONE, s);
    }
  };
  
  export const reachedToAlarmTime = (s) => {
    switch (s) {
      case State.ALARM_SET:
        return pair(Action.SOUND_ALARM, State.ALARM_SOUNDING);
      default:
        return pair(Action.NONE, s);
    }
  };
  
  export const snooze = (s) => {
    switch (s) {
      case State.ALARM_SOUNDING:
        return pair(Action.STOP_ALARM, State.SNOOZING);
      default:
        return pair(Action.NONE, s);
    }
  };
  
  export const elapseSnoozeTime = (s) => {
    switch (s) {
      case State.SNOOZING:
        return pair(Action.SOUND_ALARM, State.ALARM_SOUNDING);
      default:
        return pair(Action.NONE, s);
    }
  };
  
  // ---（任意）元のクラス風に使いたい人向けの薄いラッパー ---
  // 内部では純関数を使うので、テストは純関数に対して網羅的に書ける。
  export class AlarmClock {
    #state = State.NORMAL;
    get state() { return this.#state; }
  
    setAlarm() {
      const r = setAlarm(this.#state);
      this.#state = r.state; return r.action;
    }
    cancelAlarm() {
      const r = cancelAlarm(this.#state);
      this.#state = r.state; return r.action;
    }
    reachedToAlarmTime() {
      const r = reachedToAlarmTime(this.#state);
      this.#state = r.state; return r.action;
    }
    snooze() {
      const r = snooze(this.#state);
      this.#state = r.state; return r.action;
    }
    elapseSnoozeTime() {
      const r = elapseSnoozeTime(this.#state);
      this.#state = r.state; return r.action;
    }
  }
  
import {
    State, Action,
    setAlarm, cancelAlarm, reachedToAlarmTime, snooze, elapseSnoozeTime,
    AlarmClock
  } from './index.js';
  
  const STATES = [State.NORMAL, State.ALARM_SET, State.ALARM_SOUNDING, State.SNOOZING];
  const EVENTS = [
    { name: 'setAlarm', fn: setAlarm },
    { name: 'cancelAlarm', fn: cancelAlarm },
    { name: 'reachedToAlarmTime', fn: reachedToAlarmTime },
    { name: 'snooze', fn: snooze },
    { name: 'elapseSnoozeTime', fn: elapseSnoozeTime },
  ];
  
  // 期待遷移表（状態 × イベント → {action, state}）
  const T = {
    [State.NORMAL]: {
      setAlarm:           { action: Action.NONE,        state: State.ALARM_SET },
      cancelAlarm:        { action: Action.NONE,        state: State.NORMAL },
      reachedToAlarmTime: { action: Action.NONE,        state: State.NORMAL },
      snooze:             { action: Action.NONE,        state: State.NORMAL },
      elapseSnoozeTime:   { action: Action.NONE,        state: State.NORMAL },
    },
    [State.ALARM_SET]: {
      setAlarm:           { action: Action.NONE,        state: State.ALARM_SET },
      cancelAlarm:        { action: Action.NONE,        state: State.NORMAL },
      reachedToAlarmTime: { action: Action.SOUND_ALARM, state: State.ALARM_SOUNDING },
      snooze:             { action: Action.NONE,        state: State.ALARM_SET },
      elapseSnoozeTime:   { action: Action.NONE,        state: State.ALARM_SET },
    },
    [State.ALARM_SOUNDING]: {
      setAlarm:           { action: Action.NONE,        state: State.ALARM_SOUNDING },
      cancelAlarm:        { action: Action.STOP_ALARM,  state: State.NORMAL },
      reachedToAlarmTime: { action: Action.NONE,        state: State.ALARM_SOUNDING },
      snooze:             { action: Action.STOP_ALARM,  state: State.SNOOZING },
      elapseSnoozeTime:   { action: Action.NONE,        state: State.ALARM_SOUNDING },
    },
    [State.SNOOZING]: {
      setAlarm:           { action: Action.NONE,        state: State.SNOOZING },
      cancelAlarm:        { action: Action.NONE,        state: State.NORMAL },
      reachedToAlarmTime: { action: Action.NONE,        state: State.SNOOZING },
      snooze:             { action: Action.NONE,        state: State.SNOOZING },
      elapseSnoozeTime:   { action: Action.SOUND_ALARM, state: State.ALARM_SOUNDING },
    },
  };
  
  describe('関数の状態遷移', () => {
    for (const s of STATES) {
      describe(`from ${String(s.description || s.toString())}`, () => {
        for (const { name, fn } of EVENTS) {
          test(`${name}`, () => {
            const { action, state } = fn(s);
            const exp = T[s][name];
            expect(action).toBe(exp.action);
            expect(state).toBe(exp.state);
          });
        }
      });
    }
  });
  
  describe('ラッパークラスの挙動（代表シナリオ）', () => {
    test('NORMAL → setAlarm → reachedToAlarmTime → snooze → elapseSnoozeTime → cancelAlarm', () => {
      const c = new AlarmClock();
      expect(c.state).toBe(State.NORMAL);
  
      expect(c.setAlarm()).toBe(Action.NONE);
      expect(c.state).toBe(State.ALARM_SET);
  
      expect(c.reachedToAlarmTime()).toBe(Action.SOUND_ALARM);
      expect(c.state).toBe(State.ALARM_SOUNDING);
  
      expect(c.snooze()).toBe(Action.STOP_ALARM);
      expect(c.state).toBe(State.SNOOZING);
  
      expect(c.elapseSnoozeTime()).toBe(Action.SOUND_ALARM);
      expect(c.state).toBe(State.ALARM_SOUNDING);
  
      expect(c.cancelAlarm()).toBe(Action.STOP_ALARM);
      expect(c.state).toBe(State.NORMAL);
    });
  });
  
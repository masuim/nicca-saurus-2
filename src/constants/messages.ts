export const MESSAGES = {
  NICCA_MESSAGE: {
    BECOME_SAUR_MASTER: '恐竜マスターになろう！',
    GROW_TOGETHER: '日課を続けるとあなたも恐竜も一緒に成長します。',
    RESTART_WARNING: 'サボると最初からやり直し！',
    KEEP_GOING: '恐竜が大人になるまで頑張って続けよう！',
    DEFAULT: '日課を続けて、恐竜と一緒に成長しましょう！',
    RESTART: '新しい始まりだね！今度は最後まで一緒に頑張ろう！',
    CONGRATULATIONS:
      'おめでとうございます！\nあなたも恐竜も独り立ちの時が来ました！\n1ヶ月お疲れ様でした！',
    SAUR_GROWTH: '恐竜が一段階成長したよ！次の成長も楽しみだね！',
    ENCOURAGING: [
      'すごい！今日も一歩前進だね！',
      '継続は力なり！その調子で頑張ろう！',
      '日々の努力が実を結んでいるよ！',
      '恐竜も喜んでいるよ！一緒に成長しよう！',
      'その調子！日々の積み重ねが大切だよ！',
    ],
  },

  FORM: {
    SIGN_UP: 'サインアップ',
    SIGN_IN: 'サインイン',
    ALREADY_HAVE_ACCOUNT: 'すでにアカウントをお持ちの方は、',
    NO_ACCOUNT: 'アカウントをお持ちでない方は、',
    TO_SIGN_IN: 'サインイン',
    TO_SIGN_UP: 'サインアップ',
    TO: 'へ',
    NICCA_REGISTRATION_TITLE: '日課登録',
    NICCA_REGISTRATION_INSTRUCTION: '日課名を入力し、実施する曜日を選択してください。',
    NICCA_TITLE_PLACEHOLDER: '日課を入力してください',
    REGISTER: '登録',
  },

  NAVIGATION: {
    DASHBOARD: 'ダッシュボード',
    NICCA_LIST: '日課一覧',
    USER_SETTINGS: 'ユーザー設定',
  },

  FLASH_MESSAGES: {
    SIGN_OUT_SUCCESS: 'サインアウトしました',
    SIGN_OUT_ERROR: 'サインアウト中にエラーが発生しました。もう一度お試しください。',
    SIGN_UP_SUCCESS: 'サインアップに成功しました',
    SIGN_IN_ERROR: 'サインアップ後のサインインに失敗しました。',
    SIGN_UP_ERROR: 'サインアップに失敗しました。もう一度お試しください。',
    NICCA_REGISTRATION_SUCCESS: '日課が登録されました',
    NICCA_REGISTRATION_ERROR: '日課の登録に失敗しました',
    NICCA_REGISTRATION_UNEXPECTED_ERROR: '日課の登録中にエラーが発生しました',
    NICCA_FETCH_ERROR: '日課の取得に失敗しました',
    UNEXPECTED_ERROR: '予期せぬエラーが発生しました',
    NICCA_CREATION_ERROR: '日課の作成に失敗しました。',
    NICCA_NOT_FOUND: '指定された日課が見つかりません。',
    NICCA_DELETION_ERROR: '日課の削除に失敗しました。',
    ACHIEVEMENT_ALREADY_EXISTS: 'この日付の達成記録は既に存在します。',
    ACHIEVEMENT_ADDITION_ERROR: '達成日の追加に失敗しました。',
    EMAIL_ALREADY_REGISTERED: 'このメールアドレスは既に登録されています。',
    NICCA_DAYS_UPDATE_ERROR: 'Niccaの更新中にエラーが発生しました。',
  },

  OTHER: {
    NO_ACTIVE_NICCA: 'アクティブな日課がないよー！',
    INVALID_FIELDS: '無効なフィールドがあります。',
    USER_NOT_AUTHENTICATED: 'ユーザーが認証されていません。',
  },

  VALIDATION: {
    MINIMUM_DAYS_SELECTION: (days: number) => `少なくとも${days}日以上選択してください`,
  },

  RESET_MODAL: {
    TITLE: 'リセットのお知らせ',
    MESSAGE:
      '前回の予定日に日課を行わなかったため、\n進行状況がリセットされました。\nまた最初から一緒に頑張りましょう！',
  },

  RESET_NICCA: {
    ERROR: '日課のリセットに失敗しました',
  },
};

# 環境設定

1. プロジェクトをクローンし、プロジェクトディレクトリに移動します。

2. 必要な依存関係をインストールします：

   ```bash
   npm install
   ```

3. プロジェクトのルートディレクトリに`.env`ファイルを作成し、以下の内容を追加します：

   ```
   DATABASE_URL="file:./dev.db"
   ```

4. プロジェクトのルートディレクトリに`.env.local`ファイルを作成し、以下の内容を追加します：

   ```
   NEXTAUTH_SECRET='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
   ```

   注意：'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'を安全なランダムな文字列に置き換えてください。

5. Prismaのスキーマを生成します：

   ```bash
   npx prisma generate
   ```

6. データベースをセットアップします：

   ```bash
   npx prisma migrate dev --name init
   ```

7. 開発サーバーを起動します：

   ```bash
   npm run dev
      これにより、ブラウザで http://localhost:3000 でアプリを確認できるようになります。
   ```

8. データベースをGUI上で確認する場合は、以下のコマンドを実行してPrisma Studioを起動します：

   ```bash
   npx prisma studio
   ```

   これにより、ブラウザで http://localhost:5555 が開き、データベースの内容を確認・編集できます。

これらの手順により、ローカル開発環境が正しく設定され、アプリケーションを実行する準備が整います。

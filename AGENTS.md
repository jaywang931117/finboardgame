# 專案協作規範

在 improvements/events-and-gameplay 分支接續修改，保留組員既有功能。
維持原有結構，修改前說明範圍。新增功能需有可操作的驗證方式。
修改來源後執行 node build.mjs 更新 game.js，使用 node --test 檢查規則。
同步更新 README 與 CHANGELOG；避免提交憑證、個資或 .env。
提交時分開記錄有意義的功能與品質改良。上傳前檢查遠端分支是否有組員新提交，不使用 force push。

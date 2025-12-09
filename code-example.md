# 完整示例

## 修改原版地图实现
```cs
using BepInEx;
using BepInEx.Logging;
using BepInEx.Unity.IL2CPP;
using LevelLoader;
using System;
using System.IO;
using UnityEngine;

namespace AllWaterLevel;

[BepInPlugin(MyPluginInfo.PLUGIN_GUID, MyPluginInfo.PLUGIN_NAME, MyPluginInfo.PLUGIN_VERSION)]
[BepInDependency(LevelLoader.MyPluginInfo.PLUGIN_GUID, BepInDependency.DependencyFlags.HardDependency)]
public class Plugin : BasePlugin
{
    internal static new ManualLogSource Log;
    private static string cacheDirectory = Path.Combine("AllWaterLevelCache");

    private static Sprite allWaterNightLand;
    private static Sprite allWaterNightWater;

    private static LevelEntity allWaterNight = new LevelEntity
    {
        LevelType = (LevelType)20,
        LevelNum = 1,
        LevelName = "纯水图(夜晚)",
        LevelNameEn = "AllWaterNight",
        LevelPlantType = PlantType.CattailPlant,
        LevelSprite = allWaterNightWater,
        SceneType = SceneType.NightPool,
        MaxWave = 40,
        ZombieTypes = new System.Collections.Generic.List<ZombieType>()
        {
            ZombieType.NormalZombie,
            ZombieType.FlagZombie,
            ZombieType.ConeZombie,
            ZombieType.BucketZombie,
            ZombieType.SnorkleZombie,
            ZombieType.Dolphinrider,
            ZombieType.KirovZombie,
            ZombieType.BalloonZombie,
            ZombieType.SnowDolphinrider,
            ZombieType.IronBalloonZombie,
            ZombieType.LevatationZombie,
            ZombieType.SuperSubmarine,
            ZombieType.IronBalloonZombie2
        },
        MapRoadTypes = new int[,]
        {
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1 }
        },
        EnterAction = new System.Action(() =>
        {
            // 寻找对应GameObject
            Transform boardMap = Board.Instance.background.transform.Find("bg").Find("bg");
            // 设置陆地Sprite
            boardMap.GetComponent<SpriteRenderer>().sprite = allWaterNightLand;
            Transform water = boardMap.Find("water");
            // 设置水Sprite
            water.GetComponent<SpriteRenderer>().sprite = allWaterNightWater;
        })
    };

    private Sprite LoadOrDownloadSprite(string url, string localFileName)
    {
        // 确保缓存目录存在
        if (!Directory.Exists(cacheDirectory))
        {
            Directory.CreateDirectory(cacheDirectory);
        }

        string filePath = Path.Combine(cacheDirectory, localFileName);

        // 如果缓存文件存在，直接从文件加载
        if (File.Exists(filePath))
        {
            Log.LogInfo($"从缓存文件加载: {localFileName}");
            return Tools.LoadSpriteFromFile(filePath);
        }

        // 否则从网络下载
        Log.LogInfo($"下载并缓存: {localFileName}");
        var base64 = Tools.DownloadAndConvertToBase64Async(url).Result;
        var textureBytes = Convert.FromBase64String(base64);

        // 保存到文件
        File.WriteAllBytes(filePath, textureBytes);

        // 从文件加载
        return Tools.LoadSpriteFromFile(filePath);
    }

    private void LoadSprites()
    {
        allWaterNightLand = LoadOrDownloadSprite(
            "https://yun.urldwz.com/f/V68nTG/all_water_night_land.png",
            "all_water_night_land.png"
        );

        allWaterNightWater = LoadOrDownloadSprite(
            "https://yun.urldwz.com/f/yLaOc8/all_water_night_water.png",
            "all_water_night_water.png"
        );
    }  

    public override void Load()
    {
        // Plugin startup logic
        Log = base.Log;
        Log.LogInfo($"Plugin {MyPluginInfo.PLUGIN_GUID} is loaded!");
        LoadSprites();
        Tools.RegisterLevel(allWaterNight);
    }
}

```
## 手动加载场景实现
```cs
```
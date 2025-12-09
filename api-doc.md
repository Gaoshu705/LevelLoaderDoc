---
outline: deep
---

# LevelLoader 运行时 API

本页详细介绍了 LevelLoader 模组的运行时 API，帮助开发者更好地理解和使用 LevelLoader 的核心功能。

## LevelEntity 结构体

`LevelEntity` 是 LevelLoader 的核心数据结构，用于定义和存储自定义关卡的所有属性。

```csharp
using System;
using UnityEngine;

namespace LevelLoader
{
    public struct LevelEntity
    {
        public LevelType LevelType { get; set; }
        public int LevelNum { get; set; }
        public string LevelName { get; set; }
        public string LevelNameEn { get; set; }
        public PlantType LevelPlantType { get; set; }
        public Sprite LevelSprite { get; set; }
        public SceneType SceneType { get; set; }
        public GameObject ScenePrefab { get; set; }
        public int MaxWave { get; set; }
        public System.Collections.Generic.List<ZombieType> ZombieTypes { get; set; }
        public int[,] MapRoadTypes { get; set; }
        public Action EnterAction { get; set; }
    }
}
```

## 属性说明

### LevelType

- **类型**: `LevelType`（枚举）
- **描述**: 定义关卡的类型， 如果关卡类型在游戏枚举中存在，则进入游戏时会进入已存在的关卡中
- **示例值**: `Advanture`, `Challenge`, `Explore`, 更多枚举值可在[LevelType 枚举](#leveltype-1)中查看

### LevelNum

- **类型**: `int`
- **描述**: 关卡的编号，用于在关卡列表中排序
- **示例值**: `1`, `2`, `10`

### LevelName

- **类型**: `string`
- **描述**: 关卡的中文名称
- **示例值**: `"草地关卡"`, `"屋顶关卡"`

### LevelNameEn

- **类型**: `string`
- **描述**: 关卡的英文名称
- **示例值**: `"GrassLevel"`, `"RoofLevel"`

### LevelPlantType

- **类型**: `PlantType`（枚举）
- **描述**: 如果此枚举值不等于PeaShooter，则关卡封面会显示对应植物类型的图标
- **示例值**: `PeaShooter`, `SunFlower`

### LevelSprite

- **类型**: `UnityEngine.Sprite`
- **描述**: 关卡在选择界面中显示的背景图
- **示例**: 自定义的关卡缩略图

### SceneType

- **类型**: `SceneType`（枚举）
- **描述**: 关卡的场景类型，如草地、泳池、屋顶等，如果场景类型在游戏枚举中存在，则进入游戏时会进入已存在的场景中，不存在则需要手动加载预制件到游戏中并设置LevelLoader的SceneType属性和ScenePrefab属性
- **示例值**: `Grass`, `Pool`, `Roof`, 更多枚举值可在[SceneType 枚举](#scenetype-1)中查看

### ScenePrefab

- **类型**: `UnityEngine.GameObject`
- **描述**: 关卡场景的预制体
- **示例**: 包含地图、背景和基本配置的GameObject

### MaxWave

- **类型**: `int`
- **描述**: 关卡的最大波数
- **示例值**: `5`, `10`, `20`

### ZombieTypes

- **类型**: `List<ZombieType>`
- **描述**: 关卡中会出现的僵尸类型列表
- **示例值**: `new List<ZombieType> { ZombieType.Normal, ZombieType.Conehead, ZombieType.Buckethead }`

### MapRoadTypes

- **类型**: `int[,]`
- **描述**: 关卡地图的道路类型矩阵
- **示例**: `new int[,] { { 1, 2 }, { 3, 4 } }`，其中每个数字代表不同的道路类型，更多枚举值可在[BoxType 枚举](#boxtype)中查看

### EnterAction

- **类型**: `System.Action`
- **描述**: 进入关卡时触发的回调函数
- **示例**: 用于初始化关卡特定逻辑的委托，例如如果是套用原版地图修改地图，可以按照示例中所示的方式修改地图，也可以设置关卡其他逻辑，`选卡`、`设置传送带`、`设置初始阳光`、`设置boardTag`等

## 相关枚举

### LevelType

定义关卡的类型：

```csharp
public enum LevelType
{
    Nothing = -1,        // 无类型
    Advanture = 0,       // 冒险模式
    Challenge = 1,       // 挑战模式
    IZ = 2,              // 无限模式
    Survival = 3,        // 生存模式
    Explore = 4,         // 探索模式
    TravelAdvanture = 5, // 旅行冒险
    SkinLevel = 6,       // 皮肤关卡
    AbyssLevel = 7,      // 深渊关卡
    NewAdvanture = 8,    // 新冒险模式
    TowerLevel = 9       // 塔防模式
}
```

### SceneType

定义关卡的场景类型：

```csharp
public enum SceneType
{
    Day = 0,                 // 白天场景
    Night = 1,               // 夜晚场景
    Pool = 2,                // 泳池场景
    NightPool = 3,           // 夜晚泳池
    Roof = 4,                // 屋顶场景
    NightRoof = 5,           // 夜晚屋顶
    Day_6 = 6,               // 白天场景_6
    Night_6 = 7,             // 夜晚场景_6
    SuperDay = 8,            // 超级白天
    SuperPool = 9,           // 超级泳池
    Travel_roof = 10,        // 旅行屋顶
    Test_green = 11,         // 测试绿色场景
    Travel_roof_dusk = 12,   // 旅行屋顶黄昏
    Travel_roof_night = 13,  // 旅行屋顶夜晚
    MidDay = 14,             // 中午
    BilliardBallDay = 15,    // 台球白天
    BilliardBallMidDay = 16, // 台球中午
    PVPScaryPot = 17,        // PVP恐怖花盆
    Snow = 18,               // 雪地场景
    Chess = 19,              // 棋盘场景
    Snow_6 = 20,             // 雪地场景_6
    ReversalPool = 21,       // 反转泳池
    BigPool = 22,            // 大泳池
    Roof_Pool = 23,          // 屋顶泳池
    River = 24,              // 河流场景
    IZDay = 25,              // 无限模式白天
    SnowPool = 26,           // 雪地泳池
    LongMap = 27,            // 长地图
    TreasureBeach = 28,      // 宝藏海滩
    MidMap = 29,             // 中地图
    LavaBeach = 30,          // 熔岩海滩
    NormalBeach = 31,        // 普通海滩
    SnowPool_night = 32,     // 夜晚雪地泳池
    RoofPool_dusk = 33,      // 屋顶泳池黄昏
    RoofPool_night = 34,     // 屋顶泳池夜晚
    Day_bubble = 35          // 气泡白天
}
```

### BoxType

定义地图中地块的类型：

```csharp
public enum BoxType
{
    Grass = 0,    // 草地
    Water = 1,    // 水域
    Dirt = 2,     // 泥土
    Roof = 3,     // 屋顶
    Stone = 4,    // 石头
    River = 5,    // 河流
    Dirt_water = 6 // 泥水域
}
```

## Tools 类

`Tools` 类提供了一系列便捷方法，用于资源加载和关卡管理，是 LevelLoaderAPI 的简化封装。

### Tools.RegisterLevel

- **签名**: `public static void RegisterLevel(LevelEntity levelEntity)`
- **描述**: 注册关卡实体到关卡管理系统中
- **参数**: `levelEntity` - 要注册的关卡实体实例
- **异常**: 
  - `ArgumentNullException`: 当 levelEntity 为 null 时抛出
  - `ArgumentException`: 当关卡编号小于等于0或关卡名称为空时抛出
  - `InvalidOperationException`: 当关卡编号已存在时抛出
- **使用示例**: 
  ```csharp
  // 创建关卡实体
  var level = new LevelEntity
  {
      LevelNum = 1,
      LevelName = "新手教学"
  };

  // 注册到系统
  Tools.RegisterLevel(level);
  ```
- **注意**: 
  - 同一关卡编号只能注册一次，重复注册将被忽略

### Tools.LoadAssetBundle

- **签名**: `public static AssetBundle LoadAssetBundle(string base64String, string path = null, string resourceName = null)`
- **描述**: 从多种来源加载AssetBundle资源
- **参数**: 
  - `base64String`: AssetBundle的Base64编码字符串，优先使用此来源
  - `path`: AssetBundle文件路径，当Base64字符串为空或无效时使用
  - `resourceName`: 程序集内嵌资源名称，当其他来源都失败时使用
- **返回值**: 加载成功的AssetBundle对象，如果所有来源都失败则返回null
- **使用示例**: 
  ```csharp
  // 从Base64加载
  AssetBundle bundle1 = Tools.LoadAssetBundle(base64Data);

  // 从文件路径加载
  AssetBundle bundle2 = Tools.LoadAssetBundle(null, "C:/bundles/myBundle");

  // 使用默认内嵌资源
  AssetBundle bundle3 = Tools.LoadAssetBundle(null,null,"AssemblyName.resourceName");
  ```

### Tools.LoadSpriteFromBase64

- **签名**: `public static Sprite LoadSpriteFromBase64(string base64String)`
- **描述**: 从Base64字符串解码并创建Sprite对象
- **参数**: `base64String` - 图像数据的Base64编码字符串，支持常见的图像格式（如PNG、JPG等）
- **返回值**: 成功加载时返回Sprite对象，加载失败时返回null
- **使用示例**: 
  ```csharp
  // 从Base64字符串加载精灵
  Sprite mySprite = Tools.LoadSpriteFromBase64("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==");
  if (mySprite != null) {
      image.sprite = mySprite;
  }
  ```

### Tools.LoadSpriteFromFile

- **签名**: `public static Sprite LoadSpriteFromFile(string filePath)`
- **描述**: 从本地文件系统加载图像文件并创建Sprite对象
- **参数**: `filePath` - 图像文件的完整路径，支持常见的图像格式（如PNG、JPG等）
- **返回值**: 成功加载时返回Sprite对象，文件不存在或加载失败时返回null
- **使用示例**: 
  ```csharp
  // 从文件路径加载精灵
  Sprite mySprite = Tools.LoadSpriteFromFile("C:/Images/myImage.png");
  if (mySprite != null) {
      image.sprite = mySprite;
  }
  ```

### Tools.DownloadAndConvertToBase64Async

- **签名**: `public static async System.Threading.Tasks.Task<string> DownloadAndConvertToBase64Async(string url)`
- **描述**: 异步下载文件并转换为Base64字符串
- **参数**: `url` - 要下载的文件URL
- **返回值**: 下载并转换后的Base64字符串，如果失败则返回null
- **使用示例**: 
  ```csharp
  // 异步下载并转换为Base64
  string base64Image = await Tools.DownloadAndConvertToBase64Async("https://example.com/image.png");
  if (!string.IsNullOrEmpty(base64Image)) {
      Sprite sprite = Tools.LoadSpriteFromBase64(base64Image);
  }
  ```


## 最佳实践

1. **合理组织关卡数据**: 使用脚本ableObject或JSON文件存储关卡配置，便于管理和修改
2. **优化场景资源**: 确保关卡场景预制体经过优化，避免过大的资源消耗
3. **合理设置波次**: 根据关卡难度和游戏节奏，合理设置最大波数
4. **利用EnterAction**: 使用EnterAction回调函数初始化关卡特定的逻辑和资源
5. **测试兼容性**: 在不同设备和配置下测试自定义关卡，确保兼容性和稳定性

## 注意事项

- 确保为每个关卡提供唯一的LevelNum，避免冲突
- MapRoadTypes矩阵的维度应与关卡场景的地图大小匹配
- 避免在EnterAction中执行过多耗时操作，以免影响游戏体验
- 确保ScenePrefab包含必要的GameObject，例如`GameLose`、`floor{n}`、`bg`

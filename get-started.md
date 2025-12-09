# 快速开始

## 前置条件

在开始之前，请确保你已经满足以下条件：

- 安装了适用于你的游戏版本的 **BepInEx** 框架
- 具备基本的 C# 编程知识和 .NET 开发环境
- 安装了支持 BepInEx 插件开发的 IDE（如 Visual Studio、Rider 或 Visual Studio Code）

## 安装 LevelLoader

### 1. 下载 LevelLoader.dll

首先，你需要下载 LevelLoader.dll 文件。请从官方仓库获取最新版本：

[LevelLoader 下载地址](https://github.com/Gaoshu705/LevelLoaderDoc/releases/download/1.0.0/LevelLoader.zip)  <!-- 请替换为实际下载链接 -->

### 2. 放置 LevelLoader.dll

将下载好的 `LevelLoader.dll` 文件放入游戏目录下的 `BepInEx/plugins` 文件夹中。

### 3. 在项目中引入依赖

在你的 BepInEx 插件项目中，添加对 LevelLoader 的引用。你可以通过以下方式之一实现：

#### 方式一：通过项目文件 (.csproj) 手动添加引用
```xml
  <ItemGroup>
    <!-- BepInEx 核心依赖 -->
    <PackageReference Include="BepInEx.Unity.IL2CPP" Version="6.0.0-be.*" IncludeAssets="compile" />
    <PackageReference Include="BepInEx.PluginInfoProps" Version="2.*" />
    
    <!-- LevelLoader 引用 -->
    <Reference Include="LevelLoader">
        <!-- 请替换为你实际的 LevelLoader.dll 路径 -->
        <HintPath>path/to/your/LevelLoader.dll</HintPath>
        <Private>False</Private>
    </Reference>
  </ItemGroup>
```

#### 方式二：通过 IDE 添加引用

1. 在你的 IDE 中打开插件项目
2. 右键点击 "引用" 或 "Dependencies"
3. 选择 "添加引用"
4. 浏览并选择下载的 `LevelLoader.dll` 文件
5. 点击 "确定" 添加引用

::: tip
- 确保 LevelLoader.dll 的版本与你的游戏版本兼容
- 在修改引用后，建议重新生成项目以确保依赖正确加载
- 如果你使用的是不同的 BepInEx 版本，请相应调整 PackageReference 版本
:::

## 开始使用 LevelLoader

### 1. 引入命名空间

在你的插件代码中，首先需要引入 LevelLoader 命名空间：

```cs
using LevelLoader;
```

### 2. 添加依赖注解

为了确保 LevelLoader 在你的插件之前加载，你需要在插件类上添加依赖注解。这可以通过 `[BepInDependency]` 属性实现：

```cs
[BepInDependency(LevelLoader.MyPluginInfo.PLUGIN_GUID, BepInDependency.DependencyFlags.HardDependency)]
```

- `LevelLoader.MyPluginInfo.PLUGIN_GUID`：LevelLoader 的唯一标识符
- `BepInDependency.DependencyFlags.HardDependency`：硬依赖标志，表示如果 LevelLoader 未加载，你的插件也不会加载

### 3. 创建插件类

创建你的插件主类，并确保它继承自 `BasePlugin`（或游戏特定的插件基类）：

```cs
namespace AllWaterLevel;

[BepInPlugin(MyPluginInfo.PLUGIN_GUID, MyPluginInfo.PLUGIN_NAME, MyPluginInfo.PLUGIN_VERSION)]
[BepInDependency(LevelLoader.MyPluginInfo.PLUGIN_GUID, BepInDependency.DependencyFlags.HardDependency)]
public class Plugin : BasePlugin
{
    // 插件代码将在这里实现
}
```

::: info 关于 MyPluginInfo

`MyPluginInfo` 是一个自动生成的类，通常包含插件的基本信息（GUID、名称、版本等）。如果你没有这个类，可以手动定义这些常量：

```cs
public static class MyPluginInfo
{
    public const string PLUGIN_GUID = "com.yourname.yourplugin";
    public const string PLUGIN_NAME = "Your Plugin Name";
    public const string PLUGIN_VERSION = "1.0.0";
}
```
:::
## 4. 创建自定义关卡

现在，让我们创建一个简单的自定义关卡。以下示例将创建一个**纯水图**关卡，其中所有地面都被水覆盖。

### 4.1 定义关卡实体

首先，我们需要创建一个 `LevelEntity` 对象来定义我们的关卡属性：

```cs
private static LevelEntity allWater = new LevelEntity
{
    // 关卡类型（自定义类型，这里使用20）
    LevelType = (LevelType)20,
    
    // 关卡编号
    LevelNum = 0,
    
    // 关卡名称（中文）
    LevelName = "纯水图",
    
    // 关卡名称（英文）
    LevelNameEn = "AllWater",
    
    // 关卡植物类型
    LevelPlantType = PlantType.LotusBamboo,
    
    // 场景类型（这里使用大泳池场景）
    SceneType = SceneType.BigPool,
    
    // 最大波次数量（旗帜数）
    MaxWave = 40,
    
    // 关卡中会出现的僵尸类型列表
    ZombieTypes = new System.Collections.Generic.List<ZombieType>
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
    
    // 地图路径类型 对应类型可查看BoxType枚举
    MapRoadTypes = new int[,]
    {
        {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
        {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
        {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
        {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
        {1,1,1,1,1,1,1,1,1,1,1,1,1,1 },
        {1,1,1,1,1,1,1,1,1,1,1,1,1,1 }
    },
    
    // 进入关卡时执行的动作
    EnterAction = new System.Action(() =>
    {
        // 获取地图背景
        Transform boardMap = Board.Instance.background.transform.Find("bg").Find("bg");
        
        // 隐藏陆地
        boardMap.GetComponent<SpriteRenderer>().enabled = false;
        
        // 获取水元素
        Transform water = boardMap.Find("water");
        
        // 加载并设置水的精灵图片
        // 注意：这里使用在线图片示例，实际使用时建议使用本地资源
        string waterImageUrl = "https://yun.urldwz.com/f/weBksQ/allwater.png";
        string base64Image = Tools.DownloadAndConvertToBase64Async(waterImageUrl).Result;
        Sprite waterSprite = Tools.LoadSpriteFromBase64(base64Image);
        water.GetComponent<SpriteRenderer>().sprite = waterSprite;
    })
};
```

### 4.2 注册关卡

在插件的 `Load` 方法中，我们需要注册我们的关卡：

```cs
public override void Load()
{
    // 初始化日志
    Log = base.Log;
    Log.LogInfo($"插件 {MyPluginInfo.PLUGIN_GUID} 已加载!");
    
    // 注册我们的自定义关卡
    Tools.RegisterLevel(allWater);
}
```

## 5. 编译与运行

### 5.1 编译插件

1. 在你的 IDE 中构建项目（通常是点击 "生成" 或 "Build" 按钮）
2. 确保编译过程没有错误或警告

### 5.2 部署插件

1. 找到编译后的 DLL 文件（通常位于项目的 `bin/Debug` 或 `bin/Release` 文件夹中）
2. 将 DLL 文件复制到游戏目录下的 `BepInEx/plugins` 文件夹中

### 5.3 测试关卡

1. 启动游戏
2. 进入关卡选择界面
3. 寻找并选择你创建的自定义关卡（本例中为 "纯水图"）
4. 开始游戏并验证关卡是否按预期工作

## 6. 进阶提示

### 资源加载最佳实践

- **本地资源**：优先使用本地资源文件，避免依赖网络下载
- **资源优化**：确保图片资源经过适当压缩，避免影响游戏性能
- **异步加载**：对于大型资源，使用异步加载方式以避免游戏卡顿

### 关卡设计建议

- **逐步测试**：从小规模修改开始，逐步增加复杂度
- **性能考虑**：避免在 `EnterAction` 中执行过于复杂的操作

### 常见问题排查

- **关卡不显示**：检查关卡编号和类型是否正确，确保已正确注册关卡
- **资源加载失败**：检查资源路径或URL是否正确，确保网络连接正常
- **游戏崩溃**：检查是否存在空引用或无效操作，使用日志记录排查问题

::: tip
如果遇到问题，可以查看 BepInEx 的日志文件（通常位于 `BepInEx/LogOutput.log`）获取更多调试信息。
:::

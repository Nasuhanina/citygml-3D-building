Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYjlmZDQwNi1lZTk4LTRiMWEtYTZmNy1hYWQwMTE0NTA4YjAiLCJpZCI6MjMyMTczLCJpYXQiOjE3MjI1Njk5MTJ9.zYK14yfSExpMZOlnI7z116bF_2FR0iltHCxliN0Pat0';

const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  baseLayerPicker: false,
  sceneModePicker: false,
  animation: false,
  timeline: false,
  msaaSamples: 4,
});
const scene = viewer.scene;
scene.globe.depthTestAgainstTerrain = true;

try {
  // Load the Japan Building data asset
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2602291);
  scene.primitives.add(tileset);
  await viewer.zoomTo(tileset);
} catch (error) {
  console.log(error);
}

// Define camera locations for points of interest
const cities = {
  hiroshima: {
    destination: new Cesium.Cartesian3(-3558117.165209301, 3887175.058311886, 3582090.381367681),
    orientation: {
      direction: new Cesium.Cartesian3(0.915045649098936, -0.16130516440787898, 0.3696919041586574),
      up: new Cesium.Cartesian3(-0.20924973638933655, 0.5937271886242537, 0.7769829942214522)
    }
  },
  tokyoTower: {
    destination: new Cesium.Cartesian3(-3959788.9678092706, 3353283.9088315447, 3697270.0292328526),
    orientation: {
      direction: new Cesium.Cartesian3(0.1473261076519599, -0.9210400676146971, 0.3605276852787276),
      up: new Cesium.Cartesian3(-0.6082716434343354, 0.20305763470537083, 0.7673155835649066)
    }
  },
  kyotoNijoCastle: {
    destination: new Cesium.Cartesian3(-3746418.0787567603, 3649244.7209161296, 3638967.47570257),
    orientation: {
      direction: new Cesium.Cartesian3(0.9417381486076588, -0.026110036454204615, 0.335331963065526),
      up: new Cesium.Cartesian3(-0.2518896785254185, 0.6059364940549604, 0.7545810460280222)
    }
  },
  hakone: {
    destination: new Cesium.Cartesian3(-3938455.040928949, 3417079.906560689, 3662889.160230748),
    orientation: {
      direction: new Cesium.Cartesian3(0.09245366141098484, 0.5115481128951291, -0.854266263342487),
      up: new Cesium.Cartesian3(-0.6151172847807794, 0.703996434356258, 0.35499260045470854)
    }
  },
  mtFujiGotemba: {
    destination: new Cesium.Cartesian3(-3930814.3315207073, 3422614.91809806, 3665138.546010887),
    orientation: {
      direction: new Cesium.Cartesian3(0.8178889459747928, 0.5717362258573416, 0.06461702635254533),
      up: new Cesium.Cartesian3(-0.49123560987022913, 0.6353948538216464, 0.595785997932473)
    }
  },
  sapporo: {
    destination: new Cesium.Cartesian3(-3644464.457824361, 2916376.559037763, 4333280.277694175),
    orientation: {
      direction: new Cesium.Cartesian3(-0.3679337542668949, -0.8827113216318188, -0.2923105799215557),
      up: new Cesium.Cartesian3(-0.7773373481004832, 0.11948179734604299, 0.6176331818734058)
    }
  },
  kaga: {
    destination: new Cesium.Cartesian3(-3720805.8497414757, 3554280.4145123693, 3756470.8341226312),
    orientation: {
      direction: new Cesium.Cartesian3(-0.29857010298659575, 0.04749330012764362, -0.9532052664801844),
      up: new Cesium.Cartesian3(-0.7423221317622432, 0.6161776077834791, 0.2632166566959398)
    }
  },
  chiyoda: {
    destination: new Cesium.Cartesian3(-3955109.854745226, 3361778.037915026, 3700100.2694189543),
    orientation: {
      direction: new Cesium.Cartesian3(-0.5041450320679635, -0.6923245173006958, -0.5164693434893356),
      up: new Cesium.Cartesian3(-0.7628202030277528, 0.2718774721142018, 0.5867125733998238)
    }
  },
  iwaki: {
    destination: new Cesium.Cartesian3(-3922000.0, 3339000.0, 3700000.0),
    orientation: {
      direction: new Cesium.Cartesian3(0.5, -0.8, 0.3),
      up: new Cesium.Cartesian3(-0.6, 0.2, 0.75)
    }
  }
};
  
const cameraLight = new Cesium.DirectionalLight({
  direction: scene.camera.directionWC, // Updated every frame
});
scene.globe.enableLighting = true;
scene.globe.dynamicAtmosphereLightingFromSun = false;
scene.globe.dynamicAtmosphereLighting = false;
scene.light = cameraLight;

scene.preRender.addEventListener(function (scene, time) {
  scene.light.direction = Cesium.Cartesian3.clone(
    scene.camera.directionWC,
    scene.light.direction
  );
});

// Add event listener to the dropdown menu
document.getElementById('citySelect').addEventListener('change', function() {
  const selectedCity = this.value;
  const cityData = cities[selectedCity];
  viewer.scene.camera.flyTo(cityData);
});


viewer.scene.camera.flyTo(cities.hiroshima);
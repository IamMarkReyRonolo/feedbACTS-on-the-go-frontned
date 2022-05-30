const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: ["vuetify"],
	pwa: {
		name: "FeedbACTS App",
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			swSrc: "./src/service-worker.js",
		},
	},
});

// module.exports = {
// 	pwa: {
// 		name: "FeedbACTS App",
// 		workboxPluginMode: "InjectManifest",
// 		workboxOptions: {
// 			swSRC: "src/service-worker.js",
// 		},
// 	},
// };

const path = require('path')
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
	// 基准大小 baseSize，需要和rem.js中相同
	remUnit: 100
})


const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
	lintOnSave: false,
	publicPath: './',
	outputDir: 'dist',
	configureWebpack: {
		devtool: 'source-map',
		// devtool: isDevelopment ? 'source-map' : '',
		resolve: { // 配置解析别名
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@api': path.resolve(__dirname, './src/api'), // api路径
				'@utils': path.resolve(__dirname, './src/utils'),
				'@views': path.resolve(__dirname, './src/views'),
				'@com': path.resolve(__dirname, './src/components'),
				'@assets': path.resolve(__dirname, './src/assets'),
				'@map': path.resolve(__dirname, './src/map')
			}
		},
		plugins: [
			// jquery
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'windows.jQuery': 'jquery'
			}),
			// new UglifyPlugin({
			//   uglifyOptions: {
			//     output: {
			//       comments: true, // 去掉注释
			//     },
			//     warnings: false,
			//     compress: {
			//       drop_console: true,
			//       drop_debugger: true,
			//       // pure_funcs: ['console.log']
			//     }
			//   }
			// })

		],
		performance: {
			hints: 'warning',
			//入口起点的最大体积 整数类型（以字节为单位）
			maxEntrypointSize: 50000000,
			//生成文件的最大体积 整数类型（以字节为单位 300k）
			maxAssetSize: 30000000,
			//只给出 js 文件的性能提示
			assetFilter: function(assetFilename) {
				return assetFilename.endsWith('.js');
			}
		}
	},
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: false,
		// // 开启 CSS source maps?
		sourceMap: false,
		// // 启用 CSS modules for all css / pre-processor files.
		requireModuleExtension: true,
		loaderOptions: {
			postcss: {
				plugins: [
					postcss
				]
			}
		}
	},
	/* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
	productionSourceMap: false,

	chainWebpack(config) {
		config.plugin('preload').tap(() => [{
			rel: 'preload',
			// to ignore runtime.js
			// https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
			fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
			include: 'initial'
		}])

		// 移除 prefetch 插件(关闭首屏一次加载多个路由)
		config.plugins.delete('prefetch')
		config.optimization.minimize(false)
		config.plugin('html')
			.tap(args => {
				args[0].title = '名称'
				args[0].template = path.resolve(__dirname, 'public', isDevelopment ?
					'index-local.html' : 'index.html')
				return args
			})
		config.output.filename('js/[name].[hash].js').end();
		config.optimization.runtimeChunk('single')
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [path.resolve(__dirname, 'src/assets/css/style.less')]
		}
	},
	devServer: {
		open: true,
		host: 'localhost',
		port: 8888,
		proxy: {
			'/search': {
				target: 'https://api.github.com', // target host
				ws: false, // proxy websockets
				changeOrigin: true, // needed for virtual hosted sites
				pathRewrite: {
					'^/search': '/search'
				}
			}
		}
	}
}

function pushWhenAbsent(a, x){
	a.push(x)
}

function createCvt(src, strategy, padding){
	var MAX_SW = 4;
	var cvt = (src || []).slice(0);
	padding = padding || 0;
	while(cvt.length < padding) cvt.push(0);
	pushWhenAbsent(cvt, 0);
	pushWhenAbsent(cvt, strategy.BLUEZONE_TOP_CENTER);
	pushWhenAbsent(cvt, strategy.BLUEZONE_BOTTOM_CENTER)
	for(var w = 1; w <= MAX_SW; w++){
		for(var ppem = strategy.PPEM_MIN; ppem < strategy.PPEM_MAX; ppem++){
			pushWhenAbsent(cvt, -Math.round(strategy.UPM / ppem * w))
		}
	};
	for(var w = 1; w <= MAX_SW; w++){
		for(var ppem = strategy.PPEM_MIN; ppem < strategy.PPEM_MAX; ppem++){
			pushWhenAbsent(cvt, Math.round(strategy.UPM / ppem * w))
		}
	};
	return cvt;
};

exports.from = function(argv, strategy) {
	var cvt = createCvt([], strategy, argv.CVT_PADDING);
	if(argv.use_cvt) cvt = JSON.parse(fs.readFileSync(argv.usd_cvt, 'utf-8')).cvt;
	return cvt;
}
exports.createCvt = createCvt;
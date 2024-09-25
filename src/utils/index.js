const showFormattedDate = (date) => {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return new Date(date).toLocaleDateString('id-ID', options);
};

const getTimeAgo = (createdAt) => {
	const timestamp = Date.parse(createdAt); // convert ISO string to timestamp
	const now = new Date().getTime();
	const diff = (now - timestamp) / 1000; // convert diff to seconds

	const intervals = [
		{ label: 'tahun', seconds: 31536000 },
		{ label: 'bulan', seconds: 2592000 },
		{ label: 'hari', seconds: 86400 },
		{ label: 'jam', seconds: 3600 },
		{ label: 'menit', seconds: 60 },
		{ label: 'detik', seconds: 1 },
	];

	for (const interval of intervals) {
		if (diff >= interval.seconds) {
			const count = Math.floor(diff / interval.seconds);
			return `${count} ${interval.label} yang lalu`;
		}
	}

	return 'baru saja';
};

const getBackgroundColorClass = (index) => {
	const colors = [
		'bg-[#FF8A8A] text-slate-900', // soft red
		'bg-[#FFF4B5] text-slate-700', // soft yellow
		'bg-[#A1EEBD] text-slate-900', // soft green
		'bg-[#87A2FF] text-white', // soft blue
		'bg-[#A594F9] text-white', // soft purple
		'bg-[#FF76CE] text-white', // soft orange
		'bg-[#FFD1E3] text-slate-700', // soft pink
		'bg-[#8785A2] text-slate-100', // soft white
	];

	return colors[index % colors.length];
};

export { showFormattedDate, getBackgroundColorClass, getTimeAgo };

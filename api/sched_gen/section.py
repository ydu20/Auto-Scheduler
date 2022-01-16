class Section:
	def __init__(self, ids, quality, difficulty):
		self._ids = ids
		self._quality = quality
		self._difficulty = difficulty
		self._timeframes = []

		for times in ids.values():
			self._timeframes.extend(times)


	def get_ids(self):
		return list(self._ids.keys())

	def get_quality(self):
		return self._quality

	def get_difficulty(self):
		return self._difficulty

	def get_timeframes(self):
		return self._timeframes


	def __str__(self):
		ids = ', '.join(self._ids)
		timeframes = []
		for timepair in self._timeframes:
			timeframes.append('-'.join(timepair))
		timeframes_text = ', '.join(timeframes)

		return (ids + '\n' + timeframes_text + '\n' 
			+ str(self._quality) + '\n' + str(self._difficulty))

	def to_dict(self):

		return {
			"ids": self._ids,
			"quality": self._quality,
			"difficulty":self._difficulty
		}
class Course:
	def __init__(self, name, sections):
		self._name = name;
		self._sections = sections


	def get_name(self):
		return self._name

	def get_sections(self):
		return self._sections.copy()
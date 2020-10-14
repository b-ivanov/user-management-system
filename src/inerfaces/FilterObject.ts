import FilterStringProperty from './FilterStringProperty';
// import FilterNumberProperty from './FilterNumberProperty';

interface FilterObject
{
	id: FilterStringProperty|null,
	first_name: FilterStringProperty|null,
	last_name: FilterStringProperty|null,
	email: FilterStringProperty|null,
	gender: FilterStringProperty|null,
	job_title: FilterStringProperty|null
}

export default FilterObject;
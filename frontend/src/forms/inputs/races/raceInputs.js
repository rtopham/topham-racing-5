export const race_name = {
  name: 'race_name',
  type: 'text',
  label: 'Name',
  validationType: 'inputLength',
  length: 1
}

export const series = {
  name: 'series',
  type: 'text',
  label: 'Series',
  validationType: 'inputLength',
  length: 1
}

export const race_date = {
  name: 'race_date',
  type: 'date',
  label: 'Date',
  validationType: 'date'
}

export const category = {
  name: 'category',
  type: 'text',
  label: 'Category',
  validationType: 'inputLength',
  length: 1
}
export const time = {
  name: 'time',
  type: 'text',
  label: 'Time',
  validationType: 'time'
}

export const location = {
  name: 'location',
  type: 'text',
  label: 'Location',
  validationType: 'inputLength',
  length: 1
}

export const rank = {
  name: 'rank',
  type: 'number',
  label: 'Rank',
  validationType: 'measurement',
  min: 0,
  step: 1
}

export const raceFields = [
  race_name,
  series,
  race_date,
  category,
  time,
  location,
  rank
]

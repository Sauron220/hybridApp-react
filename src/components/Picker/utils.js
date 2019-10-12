export const defaultFieldNames = {
  label: 'label',
  value: 'value',
  children: 'children',
}

export function isMultiPicker(data = []) {
  return !data ? false : Array.isArray(data[0])
}

export function getRealCol(data = [], fieldNames = defaultFieldNames) {
  return data.map((v) => {
    if (typeof v !== 'object') {
      return {
        [defaultFieldNames.value]: v,
        [defaultFieldNames.label]: v,
      }
    }
    return {
      ...v,
      [defaultFieldNames.value]: v[fieldNames.value],
      [defaultFieldNames.label]: v[fieldNames.label],
      [defaultFieldNames.children]: v[fieldNames.children],
    }
  })
}

export function getRealCols(data = [], fieldNames = defaultFieldNames) {
  if (isMultiPicker(data)) {
    return data.reduce((acc, col) => ([...acc, getRealCol(col, fieldNames)]), [])
  }
  return getRealCol(data, fieldNames)
}

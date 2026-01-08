export const extractUniqueGroups = (definition) => {
  const groups = {};

  for (const field of definition.fields) {
    if (!field.uniqueGroup) continue;

    if (!groups[field.uniqueGroup]) {
      groups[field.uniqueGroup] = [];
    }

    groups[field.uniqueGroup].push(field.key);
  }

  return groups;
};

export const canUserFillScheme = ({
  schemeDefinition,
  user
}) => {
  // 1. Public scheme
  if (schemeDefinition.isPublic) return true;

  // 2. Explicit user assignment
  if (
    schemeDefinition.assignedUsers?.some(
      (u) => u.toString() === user._id.toString()
    )
  ) {
    return true;
  }

  // 3. Role-based assignment
  if (
    schemeDefinition.assignedRoles?.includes(user.role)
  ) {
    return true;
  }

  return false;
};

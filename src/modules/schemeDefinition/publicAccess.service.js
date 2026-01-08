export const isPublicSchemeAccessible = ({
  scheme,
  definition
}) => {
  return (
    scheme?.isPublic === true &&
    definition?.isPublic === true
  );
};
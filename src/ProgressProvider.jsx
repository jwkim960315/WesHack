import React from "react";

const ProgressProvider = ({ valueEnd, children }) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);
  return children(value);
};

export default ProgressProvider;

import { useState } from "react";

export const useAuth = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const submit = handleSubmit(onSubmit);

  return {};
};

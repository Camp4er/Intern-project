import React from "react";

function PasswordMask({ password }: { password: string }) {
  return <>{"*".repeat(password.length)}</>;
}

export default PasswordMask;

import React from "react";

import { useGetProfile } from "../../../hooks/useGetProfile";

interface IProps {
  children: React.ReactElement;
}

const GetProfile = (props: IProps) => {
  const data = useGetProfile();

  return props.children;
};

export default GetProfile;

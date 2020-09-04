// write your custom hook here to control your checkout form
import { useState } from "react";

export default (initialValue) => {
  const [formData, setFormData] = useState(initialValue);

  function handleUpdate(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return [formData, handleUpdate];
};
export const WL_J001_PRODUCT_NAME = "WL-J001";
export const WL_J001_PRODUCT_PATH = "/puertas/interior/de-madera/wl-j001";

const normalizeProductName = (value = "") => String(value).trim().toUpperCase();

export const getDedicatedDoorProductPath = (productOrName) => {
  const productName = typeof productOrName === "string"
    ? productOrName
    : productOrName?.name;

  return normalizeProductName(productName) === WL_J001_PRODUCT_NAME
    ? WL_J001_PRODUCT_PATH
    : null;
};

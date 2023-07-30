import { apiconnector } from "../apiconnector"
import { categoriesEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { CREATE_CATEGORY_API, CATEGORIES_API, CATALOGPAGEDATA_API, EDIT_CATEGORY_API } = categoriesEndpoints;

export async function GetAllCategories(setSubLinks) {
        try {
            const response = await apiconnector("GET", CATEGORIES_API);
            //console.log("GetAllCategories API RESPONSE............", response);
    
            if (!response.data.success) {
                setSubLinks([]);
                throw new Error(response.data.message);
            }else{
                setSubLinks(response.data.allCategories);
            }
        } 
        catch (error) {
            //console.log("GetAllCategories API ERROR............", error);
            setSubLinks([]);
        }
}

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiconnector("POST", CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});

        //console.log("GetCatalogaPageData API RESPONSE............", response);

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

        result = response?.data;
    }
    catch(error) {
      //console.log("CATALOG PAGE DATA API ERROR....", error);
      toast.error(error.response?.data?.message);
      result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}

export const AddCategoryData = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiconnector("POST", CREATE_CATEGORY_API,data,{
            Authorisation: `Bearer ${token}`,
        })
        //console.log("CreateCategory API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        toast.success("Category Created")
        result = response?.data?.success
    } 
    catch (error) {
        //console.log("CreateCategory API ERROR............", error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}

export const EditCategoryData = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        console.log(data);
        const response = await apiconnector("POST", EDIT_CATEGORY_API,data,{
            Authorisation: `Bearer ${token}`,
        })
        //console.log("EditCategory API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        toast.success("Category Edited")
        result = response?.data?.success
    } 
    catch (error) {
        //console.log("EditCategory API ERROR............", error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result
}
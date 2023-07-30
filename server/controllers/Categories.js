const Category = require("../models/category");
const Course = require("../models/Course");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

//Function - CreateCategory
exports.CreateCategory = async (req,res) => {
    try{
        //Fetch Data from request body
        const {name,description} = req.body;

        //validate data
        if(!name || !description){
            return res.status(403).json({
                success: false,
                message: "All fields all required"
            })
        }

        //create entry in DB
        const categorydetails = await Category.create({
            name: name,
            description: description
        })
        console.log(categorydetails);

        //Successful Response
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Please Try Again"
        })
    }
}

//Function - ShowAllCategories
exports.ShowAllCategories = async (req,res) => {
    try{
        //Fetch all categories from DB
        const allCategories = await Category.find({},{name: true, description: true});

        //Successful Response
        return res.status(200).json({
            success: true,
            message: "All Categories returned successfully",
            allCategories
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Please Try Again"
        })
    }
}

//Function - categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
	try {
        const { categoryId } = req.body

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
          .populate({
            path: "courses",
            match: { status: "Published" },
            populate: "ratingAndReviews",
          })
          .exec()
    
        console.log("SELECTED COURSE", selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
          console.log("Category not found.")
          return res
            .status(404)
            .json({ success: false, message: "Category not found" })
        }
        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
          console.log("No courses found for the selected category.")
          return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
          })
        }
    
        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
          _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
          categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            ._id
        )
          .populate({
            path: "courses",
            match: { status: "Published" },
          })
          .exec()
        console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
          .populate({
            path: "courses",
            match: { status: "Published" },
            populate: {
              path: "instructor",
          },
          })
          .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10)
        
        console.log("mostSellingCourses",mostSellingCourses);
        const NewCourses = await Course.find({}).sort({ createdAt: -1 });
        NewCourses.slice(0,5);

        res.status(200).json({
          success: true,
          data: {
            NewCourses,
            selectedCategory,
            differentCategory,
            mostSellingCourses,
          },
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Please Try Again",
          error: error.message,
        })
    }
};

//Function - editCategory
exports.editCategory = async (req,res) => {
  try{
      //Fetch Data from request body
      const {categoryId,description} = req.body;
      console.log(categoryId);
      console.log(description);

      //validate data
      if(!categoryId || !description){
          return res.status(403).json({
              success: false,
              message: "All fields all required"
          })
      }

      //Edit entry in DB
      const Newcategorydetails = await Category.findByIdAndUpdate(
        {_id:categoryId},
        {description: description},
        {new: true}
      )
      console.log(Newcategorydetails);

      //Successful Response
      return res.status(200).json({
          success: true,
          message: "Category edited successfully"
      })
  }
  catch(error){
      console.log(error);
      return res.status(500).json({
          success: false,
          message: "Please Try Again"
      })
  }
}
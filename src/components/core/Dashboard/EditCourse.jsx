import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setCourse, setEditCourse } from "../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps";
import Spinner from "../../common/Spinner";
import { getFullDetailsOfCourse } from "../../../services/operations/courseAPI";

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const GetCourseDetails = async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    }

    GetCourseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
       <Spinner />
      </div>
    )
  }

  return (
    <div>
      <h1 className="mt-5 mb-10 text-3xl font-semibold text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto w-full">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center h-screen text-3xl font-semibold text-[#ff0000]">
            Course not found. Please Try Again
          </p>
        )}
      </div>
    </div>
  )
}
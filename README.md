# UCalgary Courseweb

A visual course planning tool for University of Calgary Engineering students. This project helps students visualize degree requirements, track progress, and plan their path to graduation.

## Contribute

We need your help to keep course information accurate! If you notice missing or incorrect course details, please contribute.

**How to help:**
1. Fork the repository.
2. Update `src/data/courses.ts` or `src/data/courseDetails.json`.
3. Submit a Pull Request.

Your contributions make this tool better for everyone.

## Adding Majors and Minors

To add a new Major or Minor, you need to update `src/data/courses.ts`.

1.  **Define Courses**: Add any new courses to the appropriate course list (e.g., `NEW_MAJOR_COURSES`) and register them in `UNDERGRADUATE_COURSES`.
2.  **Define Major/Minor**: Add a new object to the `MAJORS` or `MINORS` array.
    *   **id**: A unique identifier (e.g., "civil").
    *   **label**: The display name (e.g., "Civil Engineering").
    *   **requiredCourses**: An array of course IDs.
    *   **requirementGroups**: Define groups of requirements (courses or credits).
3.  **Update Hierarchy**: If adding a Minor, update `PROGRAM_HIERARCHY` to associate it with valid Majors.


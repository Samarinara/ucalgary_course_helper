# Developer Guide: Adding Courses, Majors, and Minors

This guide explains how to add new courses, majors, and minors to the University of Calgary Engineering Course Graph application.

## Table of Contents
1. [Overview](#overview)
2. [Adding New Courses](#adding-new-courses)
3. [Adding New Majors](#adding-new-majors)
4. [Adding New Minors](#adding-new-minors)
5. [Data Structure](#data-structure)
6. [Best Practices](#best-practices)
7. [Testing Your Changes](#testing-your-changes)

## Overview

The course data is organized across multiple files:
- `src/data/courses.ts` - Main course definitions and program structures
- `src/data/courseDetails.json` - Detailed course information (titles, descriptions, units)
- `src/data/types.ts` - TypeScript type definitions

## Adding New Courses

### Step 1: Add Course Details to `courseDetails.json`

First, add the detailed information about your course to `src/data/courseDetails.json`:

```json
{
  "COURSE 101": {
    "title": "Course Title Here",
    "description": "Detailed course description explaining what students will learn.",
    "prerequisitesText": "Prerequisite(s): Any prerequisite requirements here.",
    "units": 3
  }
}
```

**Fields:**
- `title`: Full course title
- `description`: Course description (optional but recommended)
- `prerequisitesText`: Human-readable prerequisite text (optional)
- `units`: Number of credit units (required for proper credit calculations)

### Step 2: Add Course Definition to `courses.ts`

Add the course to the appropriate course array in `src/data/courses.ts`. Choose the most relevant category:

```typescript
// Example: Adding to SOFTWARE_COURSES array
const SOFTWARE_COURSES: Course[] = [
  // ... existing courses
  {
    id: "COURSE 101",
    label: "COURSE 101",
    prerequisites: ["PREREQ 101", "PREREQ 102"], // Array of prerequisite course IDs
    ...getDetails("COURSE 101"), // Automatically pulls details from JSON
  },
  // ... more courses
];
```

**Key Fields:**
- `id`: Course code (e.g., "ENSF 337") - must match the key in `courseDetails.json`
- `label`: Display label (usually same as ID)
- `prerequisites`: Array of course IDs that must be completed first
- `...getDetails("COURSE 101")`: Spreads the detailed information from the JSON file

### Step 3: Register the Course

Ensure the course is included in the course registry at the bottom of `courses.ts`:

```typescript
// All course arrays should be included here
[
  ...COMMON_YEAR_COURSES,
  ...SOFTWARE_COURSES,
  ...ELECTRICAL_COURSES,
  // ... other arrays
].forEach((c) => {
  UNDERGRADUATE_COURSES[c.id] = c;
});
```

If you created a new course array, add it to this list.

## Adding New Majors

### Step 1: Define the Major

Add a new major to the `MAJORS` array in `src/data/courses.ts`:

```typescript
export const MAJORS: Major[] = [
  // ... existing majors
  {
    id: "new-major",
    label: "New Engineering Major",
    requiredCourses: [
      "COURSE 101",
      "COURSE 102",
      // ... all required courses
    ],
    requirementGroups: [
      {
        id: "core_courses",
        label: "Core Courses",
        type: "courses",
        courses: ["COURSE 101", "COURSE 102"],
        requiredCourses: 2, // Must complete 2 courses from this group
      },
      {
        id: "technical_electives",
        label: "Technical Electives",
        type: "credits",
        courses: ["ELECTIVE 301", "ELECTIVE 302", "ELECTIVE 303"],
        requiredUnits: 6, // Must complete 6 units from this group
      },
    ],
    validMinors: ["minor1", "minor2"], // Compatible minors
  },
];
```

**Major Structure:**
- `id`: Unique identifier (used in URLs and state)
- `label`: Display name for the major
- `requiredCourses`: Flat list of all required courses (for backward compatibility)
- `requirementGroups`: Structured requirements (primary way to define requirements)
- `validMinors`: Array of minor IDs that can be combined with this major

### Step 2: Update Program Hierarchy

Add the major to the `PROGRAM_HIERARCHY` object:

```typescript
export const PROGRAM_HIERARCHY: ProgramHierarchy = {
  // ... existing majors
  "new-major": ["minor1", "minor2"], // Minors compatible with this major
};
```

## Adding New Minors

### Step 1: Define the Minor

Add a new minor to the `MINORS` array in `src/data/courses.ts`:

```typescript
export const MINORS: Minor[] = [
  // ... existing minors
  {
    id: "new-minor",
    label: "New Engineering Minor",
    requiredCourses: [
      "MINOR 101",
      "MINOR 102",
      // ... all required courses
    ],
    requirementGroups: [
      {
        id: "core_minor_courses",
        label: "Core Minor Courses",
        type: "courses",
        courses: ["MINOR 101", "MINOR 102"],
        requiredCourses: 2,
      },
    ],
  },
];
```

**Minor Structure:**
- `id`: Unique identifier
- `label`: Display name
- `requiredCourses`: Flat list of required courses
- `requirementGroups`: Structured requirements

### Step 2: Update Compatible Majors

Add the new minor ID to the `validMinors` arrays of compatible majors and update the `PROGRAM_HIERARCHY`:

```typescript
// In compatible majors
validMinors: ["existing-minor", "new-minor"],

// In PROGRAM_HIERARCHY
"existing-major": ["existing-minor", "new-minor"],
```

## Data Structure

### Requirement Groups

Requirement groups define how courses count toward a program. There are three types:

#### 1. Course-Based Requirements (`type: "courses"`)
```typescript
{
  id: "core_courses",
  label: "Core Courses",
  type: "courses",
  courses: ["COURSE 101", "COURSE 102", "COURSE 103"],
  requiredCourses: 2, // Must complete any 2 courses from the list
}
```

#### 2. Credit-Based Requirements (`type: "credits"`)
```typescript
{
  id: "technical_electives",
  label: "Technical Electives",
  type: "credits",
  courses: ["ELECTIVE 301", "ELECTIVE 302", "ELECTIVE 303"],
  requiredUnits: 6, // Must complete 6 units total from these courses
}
```

#### 3. Mixed Requirements (`type: "mixed"`)
```typescript
{
  id: "flexible_requirements",
  label: "Flexible Requirements",
  type: "mixed",
  courses: ["COURSE 301", "COURSE 302", "COURSE 303"],
  minCourses: 1, // At least 1 course
  minUnits: 3,   // At least 3 units total
}
```

### Course Progress Types

Courses can have one of three statuses:
- `"planned"` - Student intends to take the course
- `"in_progress"` - Student is currently taking the course
- `"completed"` - Student has successfully completed the course

## Best Practices

### 1. Course IDs
- Use the official University course code format (e.g., "ENSF 337")
- Be consistent with spacing and capitalization
- Ensure the ID matches exactly between `courseDetails.json` and `courses.ts`

### 2. Prerequisites
- List only direct prerequisites
- Use course IDs, not course names
- Keep the array empty (`[]`) if there are no prerequisites

### 3. Requirement Groups
- Use descriptive `id` and `label` values
- Group related courses logically
- Consider whether requirements are course-based or credit-based

### 4. Program Structure
- Keep `requiredCourses` as a flat list of all required courses
- Use `requirementGroups` for the primary requirement logic
- Ensure `validMinors` matches the `PROGRAM_HIERARCHY`

### 5. Course Details
- Always include `units` for proper credit calculations
- Provide meaningful descriptions when available
- Include prerequisite text for human readability

## Testing Your Changes

### 1. Build the Application
```bash
npm run build
```
Ensure there are no TypeScript errors related to your changes.

### 2. Run the Development Server
```bash
npm run dev
```
Test the application in your browser.

### 3. Verify Course Display
- Check that new courses appear in the course graph
- Verify course details display correctly in popups
- Test prerequisite relationships

### 4. Test Major/Minor Functionality
- Select your new major/minor from the dropdown
- Verify requirement groups display correctly
- Check progress calculations
- Test course status changes

### 5. Test Edge Cases
- Verify courses with no prerequisites work correctly
- Test credit-based vs course-based requirements
- Check that invalid major/minor combinations are prevented

## Common Issues and Solutions

### Issue: Course Not Displaying
**Solution:** Ensure the course is included in the `UNDERGRADUATE_COURSES` registry at the bottom of `courses.ts`.

### Issue: Missing Course Details
**Solution:** Verify the course ID matches exactly between `courseDetails.json` and the course definition in `courses.ts`.

### Issue: Incorrect Progress Calculations
**Solution:** Check that all courses have the correct `units` value in `courseDetails.json`.

### Issue: Prerequisites Not Working
**Solution:** Ensure prerequisite course IDs are spelled correctly and exist in the course registry.

### Issue: Major/Minor Not Available
**Solution:** Verify the major/minor is included in the appropriate exports and the `PROGRAM_HIERARCHY` is updated.

## File Structure Summary

```
src/data/
├── courses.ts          # Course definitions and program structures
├── courseDetails.json  # Detailed course information
└── types.ts           # TypeScript type definitions
```

When adding new content, you'll typically modify:
1. `courseDetails.json` - Add course details
2. `courses.ts` - Add course definitions and program structures
3. `types.ts` - Only if adding new data structures (rare)

## Support

If you encounter issues while adding courses, majors, or minors:
1. Check the browser console for JavaScript errors
2. Verify TypeScript compilation with `npm run build`
3. Review existing similar entries for patterns
4. Ensure all required fields are populated
5. Test with the development server before deploying changes
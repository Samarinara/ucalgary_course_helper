import type {
	Course,
	Major,
	Minor,
	RequirementGroup,
	ProgramHierarchy,
} from "./types";
import courseDetails from "./courseDetails.json";

// Helper to get details
const getDetails = (id: string) => {
	const details = (courseDetails as any)[id];
	return details
		? {
				name: details.title,
				description: details.description,
				units: details.units,
				// We could parse prerequisitesText here if we wanted to be fancy later
			}
		: {};
};

// Independent course registry - all undergraduate courses
export const UNDERGRADUATE_COURSES: Record<string, Course> = {};

// Common Year Courses
const COMMON_YEAR_COURSES: Course[] = [
	{
		id: "ENGG 200",
		label: "ENGG 200",
		prerequisites: [],
		...getDetails("ENGG 200"),
	},
	{
		id: "ENGG 202",
		label: "ENGG 202",
		prerequisites: [],
		...getDetails("ENGG 202"),
	},
	{
		id: "ENGG 204",
		label: "ENGG 204",
		prerequisites: [],
		...getDetails("ENGG 204"),
	}, // Fundamentals of Electrical Circuits
	{
		id: "ENGG 212",
		label: "ENGG 212",
		prerequisites: [],
		...getDetails("ENGG 212"),
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	}, // Fundamentals of Electrical Circuits and Machines
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	}, // Computational Thinking and Programming
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: ["MATH 275"],
		...getDetails("MATH 277"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
];

// Software Engineering Courses
const SOFTWARE_COURSES: Course[] = [
	{
		id: "ENSF 300",
		label: "ENSF 300",
		prerequisites: ["ENDG 233"],
		...getDetails("ENSF 300"),
	},
	{
		id: "ENSF 337",
		label: "ENSF 337",
		prerequisites: ["ENDG 233"],
		...getDetails("ENSF 337"),
	},
	{
		id: "ENSF 338",
		label: "ENSF 338",
		prerequisites: ["ENSF 337"],
		...getDetails("ENSF 338"),
	},
	{
		id: "ENSF 380",
		label: "ENSF 380",
		prerequisites: ["ENSF 337"],
		...getDetails("ENSF 380"),
	},
	{
		id: "ENSF 381",
		label: "ENSF 381",
		prerequisites: ["ENSF 380"],
		...getDetails("ENSF 381"),
	},
	{
		id: "ENSF 400",
		label: "ENSF 400",
		prerequisites: ["ENSF 338"],
		...getDetails("ENSF 400"),
	},
	{
		id: "ENSF 444",
		label: "ENSF 444",
		prerequisites: ["ENSF 338"],
		...getDetails("ENSF 444"),
	},
	{
		id: "ENSF 460",
		label: "ENSF 460",
		prerequisites: ["ENSF 337"],
		...getDetails("ENSF 460"),
	},
	{
		id: "ENSF 461",
		label: "ENSF 461",
		prerequisites: ["ENSF 337"],
		...getDetails("ENSF 461"),
	},
	{
		id: "ENSF 462",
		label: "ENSF 462",
		prerequisites: ["ENSF 337"],
		...getDetails("ENSF 462"),
	},
	{
		id: "ENSF 480",
		label: "ENSF 480",
		prerequisites: ["ENSF 381"],
		...getDetails("ENSF 480"),
	},
	{
		id: "ENSF 555",
		label: "ENSF 555",
		prerequisites: ["ENSF 480"],
		...getDetails("ENSF 555"),
	}, // Capstone?
	{
		id: "ENEL 353",
		label: "ENEL 353",
		prerequisites: ["ENGG 225"],
		...getDetails("ENEL 353"),
	},
	{
		id: "ENEL 500",
		label: "ENEL 500",
		prerequisites: [],
		...getDetails("ENEL 500"),
	}, // Capstone
	{
		id: "ENCM 369",
		label: "ENCM 369",
		prerequisites: ["ENSF 337"],
		...getDetails("ENCM 369"),
	},
	{
		id: "SENG 401",
		label: "SENG 401",
		prerequisites: ["ENSF 300"],
		...getDetails("SENG 401"),
	},
	{
		id: "SENG 438",
		label: "SENG 438",
		prerequisites: ["ENSF 300"],
		...getDetails("SENG 438"),
	},
	{
		id: "SENG 511",
		label: "SENG 511",
		prerequisites: ["ENSF 300"],
		...getDetails("SENG 511"),
	},
	{
		id: "SENG 533",
		label: "SENG 533",
		prerequisites: ["ENSF 300"],
		...getDetails("SENG 533"),
	},
	{
		id: "MATH 271",
		label: "MATH 271",
		prerequisites: ["MATH 211"],
		...getDetails("MATH 271"),
	},
	{
		id: "PHYS 365",
		label: "PHYS 365",
		prerequisites: ["PHYS 259"],
		...getDetails("PHYS 365"),
	},
	{
		id: "PHYS 369",
		label: "PHYS 369",
		prerequisites: ["PHYS 259"],
		...getDetails("PHYS 369"),
	},
	{
		id: "MATH 375",
		label: "MATH 375",
		prerequisites: ["MATH 277"],
		...getDetails("MATH 375"),
	},
	{
		id: "ENDG 319",
		label: "ENDG 319",
		prerequisites: ["MATH 211"],
		...getDetails("ENDG 319"),
	},
];

const ELECTRICAL_COURSES: Course[] = [
	{
		id: "ENEL 101",
		label: "ENEL 101",
		prerequisites: [],
		...getDetails("ENEL 101"),
	}, // Seems odd to have 101 in 2nd year list, but following PDF
	{
		id: "ENEL 102",
		label: "ENEL 102",
		prerequisites: [],
		...getDetails("ENEL 102"),
	},
	{
		id: "ENEL 300",
		label: "ENEL 300",
		prerequisites: ["ENGG 225"],
		...getDetails("ENEL 300"),
	},
	{
		id: "ENEL 327",
		label: "ENEL 327",
		prerequisites: ["ENGG 225"],
		...getDetails("ENEL 327"),
	},
	{
		id: "ENEL 343",
		label: "ENEL 343",
		prerequisites: ["ENGG 225"],
		...getDetails("ENEL 343"),
	},
	// ENEL 353 already in software
	{
		id: "ENEL 361",
		label: "ENEL 361",
		prerequisites: ["ENGG 225"],
		...getDetails("ENEL 361"),
	},
	{
		id: "ENEL 400",
		label: "ENEL 400",
		prerequisites: ["ENEL 300"],
		...getDetails("ENEL 400"),
	},
	{
		id: "ENEL 419",
		label: "ENEL 419",
		prerequisites: ["ENEL 343"],
		...getDetails("ENEL 419"),
	},
	{
		id: "ENEL 441",
		label: "ENEL 441",
		prerequisites: ["ENEL 327"],
		...getDetails("ENEL 441"),
	},
	{
		id: "ENEL 453",
		label: "ENEL 453",
		prerequisites: ["ENEL 353"],
		...getDetails("ENEL 453"),
	},
	{
		id: "ENEL 469",
		label: "ENEL 469",
		prerequisites: ["ENEL 361"],
		...getDetails("ENEL 469"),
	},
	{
		id: "ENEL 471",
		label: "ENEL 471",
		prerequisites: ["ENEL 361"],
		...getDetails("ENEL 471"),
	},
	{
		id: "ENEL 475",
		label: "ENEL 475",
		prerequisites: ["ENEL 353"],
		...getDetails("ENEL 475"),
	},
	{
		id: "ENEL 476",
		label: "ENEL 476",
		prerequisites: ["ENEL 353"],
		...getDetails("ENEL 476"),
	},
	{
		id: "ENEL 487",
		label: "ENEL 487",
		prerequisites: ["ENEL 353"],
		...getDetails("ENEL 487"),
	},
	{
		id: "ENCM 370",
		label: "ENCM 370",
		prerequisites: ["ENCM 369"],
		...getDetails("ENCM 370"),
	},
	{
		id: "ENCM 467",
		label: "ENCM 467",
		prerequisites: ["ENCM 369"],
		...getDetails("ENCM 467"),
	},
	{
		id: "ENCM 335",
		label: "ENCM 335",
		prerequisites: [],
		...getDetails("ENCM 335"),
	},
];

const BUSINESS_COURSES: Course[] = [
	{
		id: "SGMA 217",
		label: "SGMA 217",
		prerequisites: [],
		...getDetails("SGMA 217"),
	},
	{
		id: "ECON 201",
		label: "ECON 201",
		prerequisites: [],
		...getDetails("ECON 201"),
	},
	{
		id: "ECON 203",
		label: "ECON 203",
		prerequisites: [],
		...getDetails("ECON 203"),
	},
	{
		id: "ENTI 317",
		label: "ENTI 317",
		prerequisites: [],
		...getDetails("ENTI 317"),
	},
];

const MINOR_COURSES: Course[] = [
	{
		id: "AERO 410",
		label: "AERO 410",
		prerequisites: [],
		...getDetails("AERO 410"),
	},
	{
		id: "AERO 411",
		label: "AERO 411",
		prerequisites: [],
		...getDetails("AERO 411"),
	},
	{
		id: "BMEN 301",
		label: "BMEN 301",
		prerequisites: [],
		...getDetails("BMEN 301"),
	},
	{
		id: "BMEN 309",
		label: "BMEN 309",
		prerequisites: [],
		...getDetails("BMEN 309"),
	},
	{
		id: "BMEN 415",
		label: "BMEN 415",
		prerequisites: [],
		...getDetails("BMEN 415"),
	},
];

const COMPUTER_COURSES: Course[] = [
	{
		id: "ENCM 335",
		label: "ENCM 335",
		prerequisites: [],
		...getDetails("ENCM 335"),
	},
	{
		id: "ENCM 369",
		label: "ENCM 369",
		prerequisites: ["ENEL 353"],
		...getDetails("ENCM 369"),
	},
	{
		id: "ENCM 370",
		label: "ENCM 370",
		prerequisites: ["ENEL 353"],
		...getDetails("ENCM 370"),
	},
	{
		id: "ENCM 467",
		label: "ENCM 467",
		prerequisites: [],
		...getDetails("ENCM 467"),
	},
	{
		id: "ENCM 501",
		label: "ENCM 501",
		prerequisites: [],
		...getDetails("ENCM 501"),
	},
	{
		id: "ENCM 511",
		label: "ENCM 511",
		prerequisites: ["ENCM 369"],
		...getDetails("ENCM 511"),
	},
];

const AEROSPACE_COURSES: Course[] = [
	{
		id: "ENAE 410",
		label: "ENAE 410",
		prerequisites: [],
		...getDetails("ENAE 410"),
	},
	{
		id: "ENAE 411",
		label: "ENAE 411",
		prerequisites: ["ENAE 410"],
		...getDetails("ENAE 411"),
	},
];

const BIOMEDICAL_COURSES: Course[] = [
	{
		id: "BMEN 300",
		label: "BMEN 300",
		prerequisites: [],
		...getDetails("BMEN 300"),
	},
	{
		id: "BMEN 301",
		label: "BMEN 301",
		prerequisites: [],
		...getDetails("BMEN 301"),
	},
	{
		id: "BMEN 309",
		label: "BMEN 309",
		prerequisites: [],
		...getDetails("BMEN 309"),
	},
	{
		id: "BMEN 322",
		label: "BMEN 322",
		prerequisites: [],
		...getDetails("BMEN 322"),
	},
	{
		id: "BMEN 381",
		label: "BMEN 381",
		prerequisites: [],
		...getDetails("BMEN 381"),
	},
	{
		id: "BMEN 383",
		label: "BMEN 383",
		prerequisites: ["BMEN 381"],
		...getDetails("BMEN 383"),
	},
	{
		id: "BMEN 388",
		label: "BMEN 388",
		prerequisites: [],
		...getDetails("BMEN 388"),
	},
	{
		id: "BMEN 401",
		label: "BMEN 401",
		prerequisites: ["BMEN 301"],
		...getDetails("BMEN 401"),
	},
	{
		id: "BMEN 415",
		label: "BMEN 415",
		prerequisites: [],
		...getDetails("BMEN 415"),
	},
	{
		id: "BMEN 455",
		label: "BMEN 455",
		prerequisites: ["BMEN 300", "BMEN 322"],
		...getDetails("BMEN 455"),
	},
	{
		id: "BMEN 468",
		label: "BMEN 468",
		prerequisites: ["BMEN 301"],
		...getDetails("BMEN 468"),
	},
	{
		id: "BMEN 478",
		label: "BMEN 478",
		prerequisites: ["BMEN 468"],
		...getDetails("BMEN 478"),
	},
	{
		id: "BMEN 488",
		label: "BMEN 488",
		prerequisites: ["BMEN 388"],
		...getDetails("BMEN 488"),
	},
];

const DIGITAL_COURSES: Course[] = [
	{
		id: "ENDG 310",
		label: "ENDG 310",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 310"),
	},
	{
		id: "ENDG 311",
		label: "ENDG 311",
		prerequisites: [],
		...getDetails("ENDG 311"),
	},
	{
		id: "ENDG 319",
		label: "ENDG 319",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 319"),
	},
	{
		id: "ENDG 407",
		label: "ENDG 407",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 407"),
	},
	{
		id: "ENDG 410",
		label: "ENDG 410",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 410"),
	},
	{
		id: "ENDG 411",
		label: "ENDG 411",
		prerequisites: ["ENDG 410"],
		...getDetails("ENDG 411"),
	},
	{
		id: "ENDG 450",
		label: "ENDG 450",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 450"),
	},
	{
		id: "ENDG 451",
		label: "ENDG 451",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 451"),
	},
	{
		id: "ENDG 452",
		label: "ENDG 452",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 452"),
	},
	{
		id: "ENDG 453",
		label: "ENDG 453",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 453"),
	},
	{
		id: "ENDG 454",
		label: "ENDG 454",
		prerequisites: ["ENDG 233"],
		...getDetails("ENDG 454"),
	},
];

const ENERGY_COURSES: Course[] = [
	{
		id: "ENEE 355",
		label: "ENEE 355",
		prerequisites: [],
		...getDetails("ENEE 355"),
	},
	{
		id: "ENEE 377",
		label: "ENEE 377",
		prerequisites: [],
		...getDetails("ENEE 377"),
	},
	{
		id: "ENEE 501",
		label: "ENEE 501",
		prerequisites: [],
		...getDetails("ENEE 501"),
	},
	{
		id: "ENEE 503",
		label: "ENEE 503",
		prerequisites: [],
		...getDetails("ENEE 503"),
	},
	{
		id: "ENEE 505",
		label: "ENEE 505",
		prerequisites: [],
		...getDetails("ENEE 505"),
	},
	{
		id: "ENEE 575",
		label: "ENEE 575",
		prerequisites: [],
		...getDetails("ENEE 575"),
	},
];

const MECHATRONICS_COURSES: Course[] = [
	{
		id: "ENME 461",
		label: "ENME 461",
		prerequisites: [],
		...getDetails("ENME 461"),
	},
	{
		id: "ENME 561",
		label: "ENME 561",
		prerequisites: [],
		...getDetails("ENME 561"),
	},
	{
		id: "ENME 562",
		label: "ENME 562",
		prerequisites: ["ENME 561"],
		...getDetails("ENME 562"),
	},
];

// Populate independent course registry
[
	...COMMON_YEAR_COURSES,
	...SOFTWARE_COURSES,
	...ELECTRICAL_COURSES,
	...BUSINESS_COURSES,
	...MINOR_COURSES,
	...AEROSPACE_COURSES,
	...BIOMEDICAL_COURSES,
	...DIGITAL_COURSES,
	...ENERGY_COURSES,
	...MECHATRONICS_COURSES,
	...COMPUTER_COURSES,
].forEach((c) => {
	UNDERGRADUATE_COURSES[c.id] = c;
});

// Program definitions using new structure
export const MAJORS: Major[] = [
	{
		id: "software",
		label: "Software Engineering",
		requiredCourses: SOFTWARE_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_software",
				label: "Core Software Courses",
				type: "courses",
				courses: SOFTWARE_COURSES.map((c) => c.id),
				requiredCourses: SOFTWARE_COURSES.length,
			},
			{
				id: "phys_opt",
				label: "Physics Requirement",
				type: "credits",
				courses: ["PHYS 365", "PHYS 369"],
				requiredUnits: 3,
			},
			{
				id: "tech_electives",
				label: "Technical Electives",
				type: "credits",
				courses: [], // Placeholder - would be populated with actual elective list
				requiredUnits: 9,
			},
		],
		validMinors: [
			"aerospace",
			"biomedical",
			"energy",
			"management",
			"mechatronics",
		],
	},
	{
		id: "electrical",
		label: "Electrical Engineering",
		requiredCourses: ELECTRICAL_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_electrical",
				label: "Core Electrical Courses",
				type: "courses",
				courses: ELECTRICAL_COURSES.map((c) => c.id),
				requiredCourses: ELECTRICAL_COURSES.length,
			},
			{
				id: "encm_ensf_opt",
				label: "Computer/Software Option",
				type: "credits",
				courses: ["ENCM 335", "ENSF 337"],
				requiredUnits: 3,
			},
			{
				id: "comprehensive_ee_requirements",
				label: "Comprehensive Electrical Engineering Requirements (66 credits)",
				type: "credits",
				courses: [
					// Core Electrical Engineering courses
					"ENEL 101",
					"ENEL 102",
					"ENEL 300",
					"ENEL 327",
					"ENEL 343",
					"ENEL 353",
					"ENEL 361",
					"ENEL 400",
					"ENEL 419",
					"ENEL 441",
					"ENEL 453",
					"ENEL 469",
					"ENEL 471",
					"ENEL 475",
					"ENEL 476",
					"ENEL 487",
					// Advanced options (ENEL 500* or ENGG 503/504 or ENGG 501/502)
					"ENEL 500",
					"ENGG 503",
					"ENGG 504",
					"ENGG 501",
					"ENGG 502",
					// Computer Engineering courses
					"ENCM 370",
					"ENCM 467",
					// Computer Engineering or Software Engineering option
					"ENCM 335",
					"ENSF 337",
					// Mathematics and Physics
					"MATH 375",
					"PHYS 365",
				],
				requiredUnits: 66,
			},
		],
		validMinors: [
			"aerospace",
			"biomedical",
			"computer",
			"digital",
			"energy",
			"management",
			"mechatronics",
		],
	},
];

export const MINORS: Minor[] = [
	{
		id: "aerospace",
		label: "Aerospace Engineering",
		requiredCourses: ["ENAE 410", "ENAE 411"],
		requirementGroups: [
			{
				id: "core_aerospace",
				label: "Core Aerospace Courses",
				type: "courses",
				courses: ["ENAE 410", "ENAE 411"],
				requiredCourses: 2,
			},
		],
	},
	{
		id: "biomedical",
		label: "Biomedical Engineering",
		requiredCourses: [
			"BMEN 300",
			"BMEN 301",
			"BMEN 309",
			"BMEN 322",
			"BMEN 381",
			"BMEN 383",
			"BMEN 388",
			"BMEN 401",
			"BMEN 415",
			"BMEN 455",
			"BMEN 468",
			"BMEN 478",
			"BMEN 488",
		],
		requirementGroups: [
			{
				id: "core_biomedical",
				label: "Core Biomedical Courses",
				type: "courses",
				courses: [
					"BMEN 300",
					"BMEN 301",
					"BMEN 309",
					"BMEN 322",
					"BMEN 381",
					"BMEN 383",
					"BMEN 388",
					"BMEN 401",
					"BMEN 415",
					"BMEN 455",
					"BMEN 468",
					"BMEN 478",
					"BMEN 488",
				],
				requiredCourses: 13,
			},
		],
	},
	{
		id: "digital",
		label: "Digital Engineering",
		requiredCourses: [
			"ENDG 310",
			"ENDG 311",
			"ENDG 319",
			"ENDG 407",
			"ENDG 410",
			"ENDG 411",
			"ENDG 450",
			"ENDG 451",
			"ENDG 452",
			"ENDG 453",
			"ENDG 454",
		],
		requirementGroups: [
			{
				id: "core_digital",
				label: "Core Digital Courses",
				type: "courses",
				courses: [
					"ENDG 310",
					"ENDG 311",
					"ENDG 319",
					"ENDG 407",
					"ENDG 410",
					"ENDG 411",
					"ENDG 450",
					"ENDG 451",
					"ENDG 452",
					"ENDG 453",
					"ENDG 454",
				],
				requiredCourses: 11,
			},
		],
	},
	{
		id: "energy",
		label: "Energy and Environment",
		requiredCourses: [
			"ENEE 355",
			"ENEE 377",
			"ENEE 501",
			"ENEE 503",
			"ENEE 505",
			"ENEE 575",
		],
		requirementGroups: [
			{
				id: "core_energy",
				label: "Core Energy Courses",
				type: "courses",
				courses: [
					"ENEE 355",
					"ENEE 377",
					"ENEE 501",
					"ENEE 503",
					"ENEE 505",
					"ENEE 575",
				],
				requiredCourses: 6,
			},
		],
	},
	{
		id: "mechatronics",
		label: "Mechatronics",
		requiredCourses: ["ENME 461", "ENME 561", "ENME 562"],
		requirementGroups: [
			{
				id: "core_mechatronics",
				label: "Core Mechatronics Courses",
				type: "courses",
				courses: ["ENME 461", "ENME 561", "ENME 562"],
				requiredCourses: 3,
			},
		],
	},
	{
		id: "computer",
		label: "Computer Engineering",
		requiredCourses: ["ENCM 369", "ENCM 467", "ENCM 501", "ENCM 511"],
		requirementGroups: [
			{
				id: "core_computer",
				label: "Core Computer Courses",
				type: "courses",
				courses: ["ENCM 369", "ENCM 467", "ENCM 501", "ENCM 511"],
				requiredCourses: 4,
			},
		],
	},
];

// Program hierarchy - majors as parents of minors
export const PROGRAM_HIERARCHY: ProgramHierarchy = {
	software: ["aerospace", "biomedical", "energy", "management", "mechatronics"],
	electrical: [
		"aerospace",
		"biomedical",
		"computer",
		"digital",
		"energy",
		"management",
		"mechatronics",
	],
};

// Backward compatibility
export const ALL_COURSES = UNDERGRADUATE_COURSES;

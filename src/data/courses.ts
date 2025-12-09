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

// Common Year Courses (Preserving existing)
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
    },
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
    },
    {
        id: "ENDG 233",
        label: "ENDG 233",
        prerequisites: [],
        ...getDetails("ENDG 233"),
    },
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
const BIOMEDICAL_ENGINEERING_COURSES: Course[] = [
	{
		id: "BIOE 301",
		label: "BIOE 301",
		prerequisites: [],
		...getDetails("BIOE 301"),
	},
	{
		id: "BIOE 319",
		label: "BIOE 319",
		prerequisites: [],
		...getDetails("BIOE 319"),
	},
	{
		id: "BIOE 327",
		label: "BIOE 327",
		prerequisites: [],
		...getDetails("BIOE 327"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
	{
		id: "ENEL 475",
		label: "ENEL 475",
		prerequisites: [],
		...getDetails("ENEL 475"),
	},
	{
		id: "ENGG 200",
		label: "ENGG 200",
		prerequisites: [],
		...getDetails("ENGG 200"),
	},
	{
		id: "ENGG 204",
		label: "ENGG 204",
		prerequisites: [],
		...getDetails("ENGG 204"),
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	},
	{
		id: "ENGG 349",
		label: "ENGG 349",
		prerequisites: [],
		...getDetails("ENGG 349"),
	},
	{
		id: "ENGG 501",
		label: "ENGG 501",
		prerequisites: [],
		...getDetails("ENGG 501"),
	},
	{
		id: "ENGG 502",
		label: "ENGG 502",
		prerequisites: [],
		...getDetails("ENGG 502"),
	},
	{
		id: "ENPH 488",
		label: "ENPH 488",
		prerequisites: [],
		...getDetails("ENPH 488"),
	},
	{
		id: "ENPH 491",
		label: "ENPH 491",
		prerequisites: [],
		...getDetails("ENPH 491"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "PHEN 501",
		label: "PHEN 501",
		prerequisites: [],
		...getDetails("PHEN 501"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
	{
		id: "PHYS 375",
		label: "PHYS 375",
		prerequisites: [],
		...getDetails("PHYS 375"),
	},
	{
		id: "PHYS 443",
		label: "PHYS 443",
		prerequisites: [],
		...getDetails("PHYS 443"),
	},
	{
		id: "PHYS 449",
		label: "PHYS 449",
		prerequisites: [],
		...getDetails("PHYS 449"),
	},
];

const CHEMICAL_ENGINEERING_COURSES: Course[] = [
	{
		id: "CHEE 106",
		label: "CHEE 106",
		prerequisites: [],
		...getDetails("CHEE 106"),
	},
	{
		id: "CHEE 315",
		label: "CHEE 315",
		prerequisites: [],
		...getDetails("CHEE 315"),
	},
	{
		id: "CHEE 331",
		label: "CHEE 331",
		prerequisites: [],
		...getDetails("CHEE 331"),
	},
	{
		id: "CHEE 401",
		label: "CHEE 401",
		prerequisites: [],
		...getDetails("CHEE 401"),
	},
	{
		id: "CHEE 403",
		label: "CHEE 403",
		prerequisites: [],
		...getDetails("CHEE 403"),
	},
	{
		id: "CHEE 405",
		label: "CHEE 405",
		prerequisites: [],
		...getDetails("CHEE 405"),
	},
	{
		id: "CHEE 421",
		label: "CHEE 421",
		prerequisites: [],
		...getDetails("CHEE 421"),
	},
	{
		id: "CHEE 423",
		label: "CHEE 423",
		prerequisites: [],
		...getDetails("CHEE 423"),
	},
	{
		id: "CHEE 427",
		label: "CHEE 427",
		prerequisites: [],
		...getDetails("CHEE 427"),
	},
	{
		id: "CHEE 429",
		label: "CHEE 429",
		prerequisites: [],
		...getDetails("CHEE 429"),
	},
	{
		id: "CHEE 501",
		label: "CHEE 501",
		prerequisites: [],
		...getDetails("CHEE 501"),
	},
	{
		id: "CHEE 505",
		label: "CHEE 505",
		prerequisites: [],
		...getDetails("CHEE 505"),
	},
	{
		id: "CHEE 511",
		label: "CHEE 511",
		prerequisites: [],
		...getDetails("CHEE 511"),
	},
	{
		id: "CHEE 529",
		label: "CHEE 529",
		prerequisites: [],
		...getDetails("CHEE 529"),
	},
	{
		id: "CHEE 531",
		label: "CHEE 531",
		prerequisites: [],
		...getDetails("CHEE 531"),
	},
	{
		id: "CHEE 551",
		label: "CHEE 551",
		prerequisites: [],
		...getDetails("CHEE 551"),
	},
	{
		id: "CHEM 409",
		label: "CHEM 409",
		prerequisites: [],
		...getDetails("CHEM 409"),
	},
	{
		id: "CHEM 579",
		label: "CHEM 579",
		prerequisites: [],
		...getDetails("CHEM 579"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
	{
		id: "ENGG 200",
		label: "ENGG 200",
		prerequisites: [],
		...getDetails("ENGG 200"),
	},
	{
		id: "ENGG 204",
		label: "ENGG 204",
		prerequisites: [],
		...getDetails("ENGG 204"),
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	},
	{
		id: "ENGG 317",
		label: "ENGG 317",
		prerequisites: [],
		...getDetails("ENGG 317"),
	},
	{
		id: "ENGG 319",
		label: "ENGG 319",
		prerequisites: [],
		...getDetails("ENGG 319"),
	},
	{
		id: "ENGG 349",
		label: "ENGG 349",
		prerequisites: [],
		...getDetails("ENGG 349"),
	},
	{
		id: "ENGG 407",
		label: "ENGG 407",
		prerequisites: [],
		...getDetails("ENGG 407"),
	},
	{
		id: "ENGG 513",
		label: "ENGG 513",
		prerequisites: [],
		...getDetails("ENGG 513"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "MATH 307",
		label: "MATH 307",
		prerequisites: [],
		...getDetails("MATH 307"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
];

const CIVIL_ENGINEERING_COURSES: Course[] = [
	{
		id: "CIVL 413",
		label: "CIVL 413",
		prerequisites: [],
		...getDetails("CIVL 413"),
	},
	{
		id: "CIVL 423",
		label: "CIVL 423",
		prerequisites: [],
		...getDetails("CIVL 423"),
	},
	{
		id: "CIVL 451",
		label: "CIVL 451",
		prerequisites: [],
		...getDetails("CIVL 451"),
	},
	{
		id: "CIVL 461",
		label: "CIVL 461",
		prerequisites: [],
		...getDetails("CIVL 461"),
	},
	{
		id: "CIVL 471",
		label: "CIVL 471",
		prerequisites: [],
		...getDetails("CIVL 471"),
	},
	{
		id: "CIVL 473",
		label: "CIVL 473",
		prerequisites: [],
		...getDetails("CIVL 473"),
	},
	{
		id: "CIVL 481",
		label: "CIVL 481",
		prerequisites: [],
		...getDetails("CIVL 481"),
	},
	{
		id: "CIVL 570",
		label: "CIVL 570",
		prerequisites: [],
		...getDetails("CIVL 570"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
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
	},
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
	},
	{
		id: "ENGG 311",
		label: "ENGG 311",
		prerequisites: [],
		...getDetails("ENGG 311"),
	},
	{
		id: "ENGG 317",
		label: "ENGG 317",
		prerequisites: [],
		...getDetails("ENGG 317"),
	},
	{
		id: "ENGG 319",
		label: "ENGG 319",
		prerequisites: [],
		...getDetails("ENGG 319"),
	},
	{
		id: "ENGG 325",
		label: "ENGG 325",
		prerequisites: [],
		...getDetails("ENGG 325"),
	},
	{
		id: "ENGG 349",
		label: "ENGG 349",
		prerequisites: [],
		...getDetails("ENGG 349"),
	},
	{
		id: "ENGG 407",
		label: "ENGG 407",
		prerequisites: [],
		...getDetails("ENGG 407"),
	},
	{
		id: "ENGG 513",
		label: "ENGG 513",
		prerequisites: [],
		...getDetails("ENGG 513"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "MATH 307",
		label: "MATH 307",
		prerequisites: [],
		...getDetails("MATH 307"),
	},
	{
		id: "MECH 341",
		label: "MECH 341",
		prerequisites: [],
		...getDetails("MECH 341"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
];

const ELECTRICAL_ENGINEERING_COURSES: Course[] = [
	{
		id: "BIOE 301",
		label: "BIOE 301",
		prerequisites: [],
		...getDetails("BIOE 301"),
	},
	{
		id: "COMP 467",
		label: "COMP 467",
		prerequisites: [],
		...getDetails("COMP 467"),
	},
	{
		id: "ELE 327",
		label: "ELE 327",
		prerequisites: [],
		...getDetails("ELE 327"),
	},
	{
		id: "ELE 343",
		label: "ELE 343",
		prerequisites: [],
		...getDetails("ELE 343"),
	},
	{
		id: "ELE 353",
		label: "ELE 353",
		prerequisites: [],
		...getDetails("ELE 353"),
	},
	{
		id: "ELE 361",
		label: "ELE 361",
		prerequisites: [],
		...getDetails("ELE 361"),
	},
	{
		id: "ELE 441",
		label: "ELE 441",
		prerequisites: [],
		...getDetails("ELE 441"),
	},
	{
		id: "ELE 453",
		label: "ELE 453",
		prerequisites: [],
		...getDetails("ELE 453"),
	},
	{
		id: "ELE 469",
		label: "ELE 469",
		prerequisites: [],
		...getDetails("ELE 469"),
	},
	{
		id: "ELE 471",
		label: "ELE 471",
		prerequisites: [],
		...getDetails("ELE 471"),
	},
	{
		id: "ELE 475",
		label: "ELE 475",
		prerequisites: [],
		...getDetails("ELE 475"),
	},
	{
		id: "ELE 476",
		label: "ELE 476",
		prerequisites: [],
		...getDetails("ELE 476"),
	},
	{
		id: "ELE 583",
		label: "ELE 583",
		prerequisites: [],
		...getDetails("ELE 583"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
	{
		id: "ENGG 200",
		label: "ENGG 200",
		prerequisites: [],
		...getDetails("ENGG 200"),
	},
	{
		id: "ENGG 204",
		label: "ENGG 204",
		prerequisites: [],
		...getDetails("ENGG 204"),
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	},
	{
		id: "ENGG 407",
		label: "ENGG 407",
		prerequisites: [],
		...getDetails("ENGG 407"),
	},
	{
		id: "ENGG 513",
		label: "ENGG 513",
		prerequisites: [],
		...getDetails("ENGG 513"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "MATH 307",
		label: "MATH 307",
		prerequisites: [],
		...getDetails("MATH 307"),
	},
	{
		id: "MATH 375",
		label: "MATH 375",
		prerequisites: [],
		...getDetails("MATH 375"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
	{
		id: "PHYS 369",
		label: "PHYS 369",
		prerequisites: [],
		...getDetails("PHYS 369"),
	},
];

const ENGINEERING_PHYSICS_COURSES: Course[] = [
	{
		id: "ELE 469",
		label: "ELE 469",
		prerequisites: [],
		...getDetails("ELE 469"),
	},
	{
		id: "ELE 471",
		label: "ELE 471",
		prerequisites: [],
		...getDetails("ELE 471"),
	},
	{
		id: "ELE 476",
		label: "ELE 476",
		prerequisites: [],
		...getDetails("ELE 476"),
	},
	{
		id: "ENCM 335",
		label: "ENCM 335",
		prerequisites: [],
		...getDetails("ENCM 335"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
	{
		id: "ENDG 319",
		label: "ENDG 319",
		prerequisites: [],
		...getDetails("ENDG 319"),
	},
	{
		id: "ENEL 475",
		label: "ENEL 475",
		prerequisites: [],
		...getDetails("ENEL 475"),
	},
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
	},
	{
		id: "ENGG 349",
		label: "ENGG 349",
		prerequisites: [],
		...getDetails("ENGG 349"),
	},
	{
		id: "ENGG 501",
		label: "ENGG 501",
		prerequisites: [],
		...getDetails("ENGG 501"),
	},
	{
		id: "ENGG 502",
		label: "ENGG 502",
		prerequisites: [],
		...getDetails("ENGG 502"),
	},
	{
		id: "ENPH 301",
		label: "ENPH 301",
		prerequisites: [],
		...getDetails("ENPH 301"),
	},
	{
		id: "ENPH 388",
		label: "ENPH 388",
		prerequisites: [],
		...getDetails("ENPH 388"),
	},
	{
		id: "ENPH 401",
		label: "ENPH 401",
		prerequisites: [],
		...getDetails("ENPH 401"),
	},
	{
		id: "ENPH 488",
		label: "ENPH 488",
		prerequisites: [],
		...getDetails("ENPH 488"),
	},
	{
		id: "ENPH 491",
		label: "ENPH 491",
		prerequisites: [],
		...getDetails("ENPH 491"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 375",
		label: "MATH 375",
		prerequisites: [],
		...getDetails("MATH 375"),
	},
	{
		id: "MECH 479",
		label: "MECH 479",
		prerequisites: [],
		...getDetails("MECH 479"),
	},
	{
		id: "MECH 485",
		label: "MECH 485",
		prerequisites: [],
		...getDetails("MECH 485"),
	},
	{
		id: "MECH 495",
		label: "MECH 495",
		prerequisites: [],
		...getDetails("MECH 495"),
	},
	{
		id: "PHEN 381",
		label: "PHEN 381",
		prerequisites: [],
		...getDetails("PHEN 381"),
	},
	{
		id: "PHEN 383",
		label: "PHEN 383",
		prerequisites: [],
		...getDetails("PHEN 383"),
	},
	{
		id: "PHEN 435",
		label: "PHEN 435",
		prerequisites: [],
		...getDetails("PHEN 435"),
	},
	{
		id: "PHEN 501",
		label: "PHEN 501",
		prerequisites: [],
		...getDetails("PHEN 501"),
	},
	{
		id: "PHYS 229",
		label: "PHYS 229",
		prerequisites: [],
		...getDetails("PHYS 229"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
	{
		id: "PHYS 375",
		label: "PHYS 375",
		prerequisites: [],
		...getDetails("PHYS 375"),
	},
	{
		id: "PHYS 443",
		label: "PHYS 443",
		prerequisites: [],
		...getDetails("PHYS 443"),
	},
	{
		id: "PHYS 449",
		label: "PHYS 449",
		prerequisites: [],
		...getDetails("PHYS 449"),
	},
];

const GEOMATICS_ENGINEERING_COURSES: Course[] = [
	{
		id: "ENGG 319",
		label: "ENGG 319",
		prerequisites: [],
		...getDetails("ENGG 319"),
	},
	{
		id: "ENGG 325",
		label: "ENGG 325",
		prerequisites: [],
		...getDetails("ENGG 325"),
	},
	{
		id: "MATH 307",
		label: "MATH 307",
		prerequisites: [],
		...getDetails("MATH 307"),
	},
];

const MECHANICAL_ENGINEERING_COURSES: Course[] = [
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
		id: "BIOE 301",
		label: "BIOE 301",
		prerequisites: [],
		...getDetails("BIOE 301"),
	},
	{
		id: "BIOE 309",
		label: "BIOE 309",
		prerequisites: [],
		...getDetails("BIOE 309"),
	},
	{
		id: "BIOE 401",
		label: "BIOE 401",
		prerequisites: [],
		...getDetails("BIOE 401"),
	},
	{
		id: "BIOE 415",
		label: "BIOE 415",
		prerequisites: [],
		...getDetails("BIOE 415"),
	},
	{
		id: "EENG 355",
		label: "EENG 355",
		prerequisites: [],
		...getDetails("EENG 355"),
	},
	{
		id: "EENG 377",
		label: "EENG 377",
		prerequisites: [],
		...getDetails("EENG 377"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
	{
		id: "ENGG 200",
		label: "ENGG 200",
		prerequisites: [],
		...getDetails("ENGG 200"),
	},
	{
		id: "ENGG 204",
		label: "ENGG 204",
		prerequisites: [],
		...getDetails("ENGG 204"),
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	},
	{
		id: "ENGG 311",
		label: "ENGG 311",
		prerequisites: [],
		...getDetails("ENGG 311"),
	},
	{
		id: "ENGG 317",
		label: "ENGG 317",
		prerequisites: [],
		...getDetails("ENGG 317"),
	},
	{
		id: "ENGG 325",
		label: "ENGG 325",
		prerequisites: [],
		...getDetails("ENGG 325"),
	},
	{
		id: "ENGG 349",
		label: "ENGG 349",
		prerequisites: [],
		...getDetails("ENGG 349"),
	},
	{
		id: "ENGG 501",
		label: "ENGG 501",
		prerequisites: [],
		...getDetails("ENGG 501"),
	},
	{
		id: "ENGG 502",
		label: "ENGG 502",
		prerequisites: [],
		...getDetails("ENGG 502"),
	},
	{
		id: "ENRM 301",
		label: "ENRM 301",
		prerequisites: [],
		...getDetails("ENRM 301"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "MECH 317",
		label: "MECH 317",
		prerequisites: [],
		...getDetails("MECH 317"),
	},
	{
		id: "MECH 337",
		label: "MECH 337",
		prerequisites: [],
		...getDetails("MECH 337"),
	},
	{
		id: "MECH 339",
		label: "MECH 339",
		prerequisites: [],
		...getDetails("MECH 339"),
	},
	{
		id: "MECH 341",
		label: "MECH 341",
		prerequisites: [],
		...getDetails("MECH 341"),
	},
	{
		id: "MECH 421",
		label: "MECH 421",
		prerequisites: [],
		...getDetails("MECH 421"),
	},
	{
		id: "MECH 461",
		label: "MECH 461",
		prerequisites: [],
		...getDetails("MECH 461"),
	},
	{
		id: "MECH 471",
		label: "MECH 471",
		prerequisites: [],
		...getDetails("MECH 471"),
	},
	{
		id: "MECH 473",
		label: "MECH 473",
		prerequisites: [],
		...getDetails("MECH 473"),
	},
	{
		id: "MECH 479",
		label: "MECH 479",
		prerequisites: [],
		...getDetails("MECH 479"),
	},
	{
		id: "MECH 485",
		label: "MECH 485",
		prerequisites: [],
		...getDetails("MECH 485"),
	},
	{
		id: "MECH 493",
		label: "MECH 493",
		prerequisites: [],
		...getDetails("MECH 493"),
	},
	{
		id: "MECH 495",
		label: "MECH 495",
		prerequisites: [],
		...getDetails("MECH 495"),
	},
	{
		id: "MECH 585",
		label: "MECH 585",
		prerequisites: [],
		...getDetails("MECH 585"),
	},
	{
		id: "MECH 599",
		label: "MECH 599",
		prerequisites: [],
		...getDetails("MECH 599"),
	},
	{
		id: "MFE 417",
		label: "MFE 417",
		prerequisites: [],
		...getDetails("MFE 417"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
];

const OIL_GAS_PETROLEUM_COURSES: Course[] = [
	{
		id: "CHEE 315",
		label: "CHEE 315",
		prerequisites: [],
		...getDetails("CHEE 315"),
	},
	{
		id: "CHEE 331",
		label: "CHEE 331",
		prerequisites: [],
		...getDetails("CHEE 331"),
	},
	{
		id: "CHEE 401",
		label: "CHEE 401",
		prerequisites: [],
		...getDetails("CHEE 401"),
	},
	{
		id: "CHEE 403",
		label: "CHEE 403",
		prerequisites: [],
		...getDetails("CHEE 403"),
	},
	{
		id: "CHEE 405",
		label: "CHEE 405",
		prerequisites: [],
		...getDetails("CHEE 405"),
	},
	{
		id: "CHEE 427",
		label: "CHEE 427",
		prerequisites: [],
		...getDetails("CHEE 427"),
	},
	{
		id: "CHEE 501",
		label: "CHEE 501",
		prerequisites: [],
		...getDetails("CHEE 501"),
	},
	{
		id: "CHEM 357",
		label: "CHEM 357",
		prerequisites: [],
		...getDetails("CHEM 357"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
	{
		id: "ENGG 200",
		label: "ENGG 200",
		prerequisites: [],
		...getDetails("ENGG 200"),
	},
	{
		id: "ENGG 204",
		label: "ENGG 204",
		prerequisites: [],
		...getDetails("ENGG 204"),
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	},
	{
		id: "ENGG 311",
		label: "ENGG 311",
		prerequisites: [],
		...getDetails("ENGG 311"),
	},
	{
		id: "ENGG 317",
		label: "ENGG 317",
		prerequisites: [],
		...getDetails("ENGG 317"),
	},
	{
		id: "ENGG 319",
		label: "ENGG 319",
		prerequisites: [],
		...getDetails("ENGG 319"),
	},
	{
		id: "ENGG 325",
		label: "ENGG 325",
		prerequisites: [],
		...getDetails("ENGG 325"),
	},
	{
		id: "ENGG 349",
		label: "ENGG 349",
		prerequisites: [],
		...getDetails("ENGG 349"),
	},
	{
		id: "ENGG 407",
		label: "ENGG 407",
		prerequisites: [],
		...getDetails("ENGG 407"),
	},
	{
		id: "ENGG 513",
		label: "ENGG 513",
		prerequisites: [],
		...getDetails("ENGG 513"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "MATH 307",
		label: "MATH 307",
		prerequisites: [],
		...getDetails("MATH 307"),
	},
	{
		id: "PETR 313",
		label: "PETR 313",
		prerequisites: [],
		...getDetails("PETR 313"),
	},
	{
		id: "PETR 423",
		label: "PETR 423",
		prerequisites: [],
		...getDetails("PETR 423"),
	},
	{
		id: "PETR 429",
		label: "PETR 429",
		prerequisites: [],
		...getDetails("PETR 429"),
	},
	{
		id: "PETR 505",
		label: "PETR 505",
		prerequisites: [],
		...getDetails("PETR 505"),
	},
	{
		id: "PETR 507",
		label: "PETR 507",
		prerequisites: [],
		...getDetails("PETR 507"),
	},
	{
		id: "PETR 509",
		label: "PETR 509",
		prerequisites: [],
		...getDetails("PETR 509"),
	},
	{
		id: "PETR 511",
		label: "PETR 511",
		prerequisites: [],
		...getDetails("PETR 511"),
	},
	{
		id: "PETR 515",
		label: "PETR 515",
		prerequisites: [],
		...getDetails("PETR 515"),
	},
	{
		id: "PETR 525",
		label: "PETR 525",
		prerequisites: [],
		...getDetails("PETR 525"),
	},
	{
		id: "PETR 531",
		label: "PETR 531",
		prerequisites: [],
		...getDetails("PETR 531"),
	},
	{
		id: "PETR 533",
		label: "PETR 533",
		prerequisites: [],
		...getDetails("PETR 533"),
	},
	{
		id: "PETR 551",
		label: "PETR 551",
		prerequisites: [],
		...getDetails("PETR 551"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
];

const SOFTWARE_ENGINEERING_COURSES: Course[] = [
	{
		id: "ELE 500",
		label: "ELE 500",
		prerequisites: [],
		...getDetails("ELE 500"),
	},
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
	{
		id: "ENGG 200",
		label: "ENGG 200",
		prerequisites: [],
		...getDetails("ENGG 200"),
	},
	{
		id: "ENGG 204",
		label: "ENGG 204",
		prerequisites: [],
		...getDetails("ENGG 204"),
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "MATH 375",
		label: "MATH 375",
		prerequisites: [],
		...getDetails("MATH 375"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
	{
		id: "PHYS 365",
		label: "PHYS 365",
		prerequisites: [],
		...getDetails("PHYS 365"),
	},
];

const SUSTAINABLE_SYSTEMS_COURSES: Course[] = [
	{
		id: "ENDG 233",
		label: "ENDG 233",
		prerequisites: [],
		...getDetails("ENDG 233"),
	},
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
	},
	{
		id: "ENGG 225",
		label: "ENGG 225",
		prerequisites: [],
		...getDetails("ENGG 225"),
	},
	{
		id: "MATH 211",
		label: "MATH 211",
		prerequisites: [],
		...getDetails("MATH 211"),
	},
	{
		id: "MATH 275",
		label: "MATH 275",
		prerequisites: [],
		...getDetails("MATH 275"),
	},
	{
		id: "MATH 277",
		label: "MATH 277",
		prerequisites: [],
		...getDetails("MATH 277"),
	},
	{
		id: "PHYS 259",
		label: "PHYS 259",
		prerequisites: [],
		...getDetails("PHYS 259"),
	},
];

const ENERGY_DIPLOMA_DEGREE_COURSES: Course[] = [
];

const AEROSPACE_ENGINEERING_COURSES: Course[] = [
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
		id: "ELE 301",
		label: "ELE 301",
		prerequisites: [],
		...getDetails("ELE 301"),
	},
	{
		id: "ENGG 501",
		label: "ENGG 501",
		prerequisites: [],
		...getDetails("ENGG 501"),
	},
	{
		id: "ENGG 502",
		label: "ENGG 502",
		prerequisites: [],
		...getDetails("ENGG 502"),
	},
	{
		id: "GEOM 333",
		label: "GEOM 333",
		prerequisites: [],
		...getDetails("GEOM 333"),
	},
];

const BIOMEDICAL_ENGINEERING_COURSES: Course[] = [
	{
		id: "BIOE 301",
		label: "BIOE 301",
		prerequisites: [],
		...getDetails("BIOE 301"),
	},
	{
		id: "BIOE 309",
		label: "BIOE 309",
		prerequisites: [],
		...getDetails("BIOE 309"),
	},
	{
		id: "BIOE 401",
		label: "BIOE 401",
		prerequisites: [],
		...getDetails("BIOE 401"),
	},
	{
		id: "BIOE 415",
		label: "BIOE 415",
		prerequisites: [],
		...getDetails("BIOE 415"),
	},
];

const DIGITAL_ENGINEERING_COURSES: Course[] = [
	{
		id: "ENDG 310",
		label: "ENDG 310",
		prerequisites: [],
		...getDetails("ENDG 310"),
	},
	{
		id: "ENDG 311",
		label: "ENDG 311",
		prerequisites: [],
		...getDetails("ENDG 311"),
	},
	{
		id: "ENDG 410",
		label: "ENDG 410",
		prerequisites: [],
		...getDetails("ENDG 410"),
	},
	{
		id: "ENDG 411",
		label: "ENDG 411",
		prerequisites: [],
		...getDetails("ENDG 411"),
	},
	{
		id: "ENDG 510",
		label: "ENDG 510",
		prerequisites: [],
		...getDetails("ENDG 510"),
	},
	{
		id: "ENDG 511",
		label: "ENDG 511",
		prerequisites: [],
		...getDetails("ENDG 511"),
	},
];

const ENERGY_AND_ENVIRONMENT_COURSES: Course[] = [
	{
		id: "EENG 311",
		label: "EENG 311",
		prerequisites: [],
		...getDetails("EENG 311"),
	},
	{
		id: "EENG 355",
		label: "EENG 355",
		prerequisites: [],
		...getDetails("EENG 355"),
	},
	{
		id: "EENG 377",
		label: "EENG 377",
		prerequisites: [],
		...getDetails("EENG 377"),
	},
];

const MECHATRONICS_COURSES: Course[] = [
	{
		id: "ELE 301",
		label: "ELE 301",
		prerequisites: [],
		...getDetails("ELE 301"),
	},
	{
		id: "ELE 327",
		label: "ELE 327",
		prerequisites: [],
		...getDetails("ELE 327"),
	},
	{
		id: "ENGG 501",
		label: "ENGG 501",
		prerequisites: [],
		...getDetails("ENGG 501"),
	},
	{
		id: "ENGG 502",
		label: "ENGG 502",
		prerequisites: [],
		...getDetails("ENGG 502"),
	},
	{
		id: "GEOM 333",
		label: "GEOM 333",
		prerequisites: [],
		...getDetails("GEOM 333"),
	},
	{
		id: "MECH 501",
		label: "MECH 501",
		prerequisites: [],
		...getDetails("MECH 501"),
	},
	{
		id: "MECH 502",
		label: "MECH 502",
		prerequisites: [],
		...getDetails("MECH 502"),
	},
	{
		id: "MECH 561",
		label: "MECH 561",
		prerequisites: [],
		...getDetails("MECH 561"),
	},
	{
		id: "MECH 562",
		label: "MECH 562",
		prerequisites: [],
		...getDetails("MECH 562"),
	},
];

const ENTREPRENEURSHIP_AND_ENTERPRISE_DEVELOPMENT_MEED_COURSES: Course[] = [
];

export const MAJORS: Major[] = [
	{
		id: "biomedical_engineering",
		label: "Biomedical Engineering",
		requiredCourses: BIOMEDICAL_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_biomedical_engineering",
				label: "Core Biomedical Engineering Courses",
				type: "courses",
				courses: BIOMEDICAL_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: BIOMEDICAL_ENGINEERING_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "chemical_engineering",
		label: "Chemical Engineering",
		requiredCourses: CHEMICAL_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_chemical_engineering",
				label: "Core Chemical Engineering Courses",
				type: "courses",
				courses: CHEMICAL_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: CHEMICAL_ENGINEERING_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "civil_engineering",
		label: "Civil Engineering",
		requiredCourses: CIVIL_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_civil_engineering",
				label: "Core Civil Engineering Courses",
				type: "courses",
				courses: CIVIL_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: CIVIL_ENGINEERING_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "electrical_engineering",
		label: "Electrical Engineering",
		requiredCourses: ELECTRICAL_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_electrical_engineering",
				label: "Core Electrical Engineering Courses",
				type: "courses",
				courses: ELECTRICAL_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: ELECTRICAL_ENGINEERING_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "engineering_physics",
		label: "Engineering Physics",
		requiredCourses: ENGINEERING_PHYSICS_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_engineering_physics",
				label: "Core Engineering Physics Courses",
				type: "courses",
				courses: ENGINEERING_PHYSICS_COURSES.map((c) => c.id),
				requiredCourses: ENGINEERING_PHYSICS_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "geomatics_engineering",
		label: "Geomatics Engineering",
		requiredCourses: GEOMATICS_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_geomatics_engineering",
				label: "Core Geomatics Engineering Courses",
				type: "courses",
				courses: GEOMATICS_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: GEOMATICS_ENGINEERING_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "mechanical_engineering",
		label: "Mechanical Engineering",
		requiredCourses: MECHANICAL_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_mechanical_engineering",
				label: "Core Mechanical Engineering Courses",
				type: "courses",
				courses: MECHANICAL_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: MECHANICAL_ENGINEERING_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "oil_gas_engineering_petroleum",
		label: "Oil & Gas Engineering (Petroleum)",
		requiredCourses: OIL_GAS_PETROLEUM_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_oil_gas_engineering_petroleum",
				label: "Core Oil & Gas Engineering (Petroleum) Courses",
				type: "courses",
				courses: OIL_GAS_PETROLEUM_COURSES.map((c) => c.id),
				requiredCourses: OIL_GAS_PETROLEUM_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "software_engineering",
		label: "Software Engineering",
		requiredCourses: SOFTWARE_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_software_engineering",
				label: "Core Software Engineering Courses",
				type: "courses",
				courses: SOFTWARE_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: SOFTWARE_ENGINEERING_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "sustainable_systems",
		label: "Sustainable Systems Engineering",
		requiredCourses: SUSTAINABLE_SYSTEMS_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_sustainable_systems",
				label: "Core Sustainable Systems Engineering Courses",
				type: "courses",
				courses: SUSTAINABLE_SYSTEMS_COURSES.map((c) => c.id),
				requiredCourses: SUSTAINABLE_SYSTEMS_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
	{
		id: "energy_eng",
		label: "Energy Engineering (Diploma + Degree)",
		requiredCourses: ENERGY_DIPLOMA_DEGREE_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_energy_eng",
				label: "Core Energy Engineering (Diploma + Degree) Courses",
				type: "courses",
				courses: ENERGY_DIPLOMA_DEGREE_COURSES.map((c) => c.id),
				requiredCourses: ENERGY_DIPLOMA_DEGREE_COURSES.length,
			},
		],
		validMinors: [], // To be populated
	},
];

export const MINORS: Minor[] = [
	{
		id: "aerospace_engineering",
		label: "Aerospace Engineering",
		requiredCourses: AEROSPACE_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_aerospace_engineering",
				label: "Core Aerospace Engineering Courses",
				type: "courses",
				courses: AEROSPACE_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: AEROSPACE_ENGINEERING_COURSES.length,
			},
		],
	},
	{
		id: "biomedical_engineering",
		label: "Biomedical Engineering",
		requiredCourses: BIOMEDICAL_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_biomedical_engineering",
				label: "Core Biomedical Engineering Courses",
				type: "courses",
				courses: BIOMEDICAL_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: BIOMEDICAL_ENGINEERING_COURSES.length,
			},
		],
	},
	{
		id: "digital_engineering",
		label: "Digital Engineering",
		requiredCourses: DIGITAL_ENGINEERING_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_digital_engineering",
				label: "Core Digital Engineering Courses",
				type: "courses",
				courses: DIGITAL_ENGINEERING_COURSES.map((c) => c.id),
				requiredCourses: DIGITAL_ENGINEERING_COURSES.length,
			},
		],
	},
	{
		id: "energy_and_environment_engineering",
		label: "Energy and Environment Engineering",
		requiredCourses: ENERGY_AND_ENVIRONMENT_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_energy_and_environment_engineering",
				label: "Core Energy and Environment Engineering Courses",
				type: "courses",
				courses: ENERGY_AND_ENVIRONMENT_COURSES.map((c) => c.id),
				requiredCourses: ENERGY_AND_ENVIRONMENT_COURSES.length,
			},
		],
	},
	{
		id: "mechatronics_engineering",
		label: "Mechatronics Engineering",
		requiredCourses: MECHATRONICS_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_mechatronics_engineering",
				label: "Core Mechatronics Engineering Courses",
				type: "courses",
				courses: MECHATRONICS_COURSES.map((c) => c.id),
				requiredCourses: MECHATRONICS_COURSES.length,
			},
		],
	},
	{
		id: "entrepreneurship",
		label: "Entrepreneurship and Enterprise Development (MEED)",
		requiredCourses: ENTREPRENEURSHIP_AND_ENTERPRISE_DEVELOPMENT_MEED_COURSES.map((c) => c.id),
		requirementGroups: [
			{
				id: "core_entrepreneurship",
				label: "Core Entrepreneurship and Enterprise Development (MEED) Courses",
				type: "courses",
				courses: ENTREPRENEURSHIP_AND_ENTERPRISE_DEVELOPMENT_MEED_COURSES.map((c) => c.id),
				requiredCourses: ENTREPRENEURSHIP_AND_ENTERPRISE_DEVELOPMENT_MEED_COURSES.length,
			},
		],
	},
];

export const PROGRAM_HIERARCHY: ProgramHierarchy = {
	"biomedical_engineering": ["digital_engineering", "entrepreneurship"],
	"chemical_engineering": ["biomedical_engineering", "digital_engineering", "entrepreneurship"],
	"civil_engineering": ["biomedical_engineering", "digital_engineering", "entrepreneurship"],
	"electrical_engineering": ["aerospace_engineering", "biomedical_engineering", "digital_engineering", "entrepreneurship"],
	"engineering_physics": ["digital_engineering", "entrepreneurship"],
	"geomatics_engineering": ["aerospace_engineering", "biomedical_engineering", "digital_engineering", "entrepreneurship"],
	"mechanical_engineering": ["aerospace_engineering", "biomedical_engineering", "digital_engineering", "entrepreneurship"],
	"oil_gas_engineering_petroleum": ["digital_engineering", "entrepreneurship"],
	"software_engineering": ["aerospace_engineering", "biomedical_engineering", "digital_engineering", "entrepreneurship"],
	"sustainable_systems": ["digital_engineering", "entrepreneurship"],
	"energy_eng": ["digital_engineering", "entrepreneurship"],
};
// Populate independent course registry
[
    ...COMMON_YEAR_COURSES,
    ...BUSINESS_COURSES,
    ...BIOMEDICAL_ENGINEERING_COURSES,
    ...CHEMICAL_ENGINEERING_COURSES,
    ...CIVIL_ENGINEERING_COURSES,
    ...ELECTRICAL_ENGINEERING_COURSES,
    ...ENGINEERING_PHYSICS_COURSES,
    ...GEOMATICS_ENGINEERING_COURSES,
    ...MECHANICAL_ENGINEERING_COURSES,
    ...OIL_GAS_PETROLEUM_COURSES,
    ...SOFTWARE_ENGINEERING_COURSES,
    ...SUSTAINABLE_SYSTEMS_COURSES,
    ...ENERGY_DIPLOMA_DEGREE_COURSES,
    ...AEROSPACE_ENGINEERING_COURSES,
    ...DIGITAL_ENGINEERING_COURSES,
    ...ENERGY_AND_ENVIRONMENT_COURSES,
    ...MECHATRONICS_COURSES,
    ...ENTREPRENEURSHIP_AND_ENTERPRISE_DEVELOPMENT_MEED_COURSES,
].forEach((c) => {
    UNDERGRADUATE_COURSES[c.id] = c;
});

// Backward compatibility
export const ALL_COURSES = UNDERGRADUATE_COURSES;

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const csvPath = path.join(process.cwd(), 'webpagePDFs', 'courses-report.2025-11-28.csv');
const outputPath = path.join(process.cwd(), 'src', 'data', 'courseDetails.json');

const fileContent = fs.readFileSync(csvPath, 'utf-8');

const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true, // Handle potential quote issues in descriptions
});

const courseDetails = {};

records.forEach(record => {
    const subject = record['Subject code'];
    const number = record['Catalog Number'];
    const id = `${subject} ${number}`;
    const title = record['Long Course Title'];
    const units = parseFloat(record['Units - Units - Units']) || 0;
    const fullDescription = record['Description'] || '';

    // Split description and prerequisites
    // Usually "Prerequisite(s):" or "Corequisite(s):" or "Antirequisite(s):"
    // We'll take everything before "Prerequisite(s):" as description
    // And extract the Prerequisite text.

    let description = fullDescription;
    let prerequisitesText = '';

    const prereqIndex = fullDescription.indexOf('Prerequisite(s):');
    if (prereqIndex !== -1) {
        description = fullDescription.substring(0, prereqIndex).trim();
        // Extract until next section or end
        const remaining = fullDescription.substring(prereqIndex);
        // Simple split by newlines or other keywords might be needed, but for now take the rest
        // or try to find "Antirequisite(s):" or "Corequisite(s):"
        const nextSectionIndex = Math.min(
            remaining.indexOf('Antirequisite(s):') === -1 ? Infinity : remaining.indexOf('Antirequisite(s):'),
            remaining.indexOf('Corequisite(s):') === -1 ? Infinity : remaining.indexOf('Corequisite(s):'),
            remaining.indexOf('Notes:') === -1 ? Infinity : remaining.indexOf('Notes:')
        );

        if (nextSectionIndex !== Infinity) {
            prerequisitesText = remaining.substring(0, nextSectionIndex).trim();
        } else {
            prerequisitesText = remaining.trim();
        }
    }

    courseDetails[id] = {
        title,
        description,
        prerequisitesText,
        units
    };
});

fs.writeFileSync(outputPath, JSON.stringify(courseDetails, null, 2));

console.log(`Processed ${Object.keys(courseDetails).length} courses.`);

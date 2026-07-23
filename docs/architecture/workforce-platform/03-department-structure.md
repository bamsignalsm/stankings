# 3. Department Structure

Canonical department slugs (expandable):

Executive, Administration, Operations, Finance, Technology, Engineering, Customer Success, Customer Support, Moderation & Trust, Editorial, Marketing, Public Relations, Sales, Business Development, Legal & Compliance, Human Resources, People Operations, Content, Media, Design, Creative, Growth, Product, Quality Assurance, Security, Data & Analytics.

Stored in `workforce_departments` with `company_id` + `slug` + `name`. Departments may be enabled per company; unused departments stay inactive.

## Default company → department map (launch)

| Company | Primary departments |
|---------|---------------------|
| hq | Executive, Administration, Human Resources, Finance, Legal & Compliance, Business Development, Engineering, Technology |
| stankings-times | Editorial, Content, Media, Public Relations, Marketing, Design, Creative |
| bamsignal | Customer Support, Moderation & Trust, Growth, Marketing, Customer Success |
| yike | Customer Support, Moderation & Trust, Operations, Sales |
| bayright | Customer Support, Operations, Finance, Legal & Compliance, Security |
| stanhan | Sales, Operations, Customer Success |
| stankings-auto-hub | Sales, Operations, Customer Success |
| hannahkings-education | Administration, Customer Success, Operations |
| hannahkings-gadgets | Sales, Operations, Customer Support |
| stankings-foundation | Operations, Marketing, Public Relations |

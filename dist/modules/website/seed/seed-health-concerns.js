"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedHealthConcerns = seedHealthConcerns;
const health_concern_orm_entity_1 = require("../entities/health-concern.orm-entity");
const healthConcerns = [
    {
        name: 'Malaria',
        slug: 'malaria',
        description: 'Malaria is a life-threatening mosquito-borne disease caused by Plasmodium parasites. It is transmitted through the bites of infected female Anopheles mosquitoes and remains a major health concern in tropical and subtropical regions worldwide.',
        content: `<h2>Malaria</h2>
<p>Malaria is a serious and sometimes fatal disease caused by parasites of the Plasmodium species. It is transmitted to humans through the bites of infected Anopheles mosquitoes. Five parasite species cause malaria in humans, with Plasmodium falciparum being the most dangerous.</p>

<h3>Symptoms of Malaria</h3>
<p>Malaria symptoms typically appear 10-15 days after an infectious mosquito bite. Early symptoms include fever, headache, and chills, which may be mild and difficult to recognize. Symptoms progress to include high fever with shaking chills, profuse sweating, fatigue, nausea, and muscle aches. In severe cases, patients may develop jaundice, seizures, confusion, kidney failure, and coma. Severe malaria is a medical emergency requiring immediate treatment.</p>

<h3>Prevention of Malaria</h3>
<p>Malaria prevention involves a comprehensive approach combining personal protection and community measures. Personal preventive measures include sleeping under insecticide-treated mosquito nets, applying DEET-containing insect repellent, wearing long-sleeved clothing and pants during evening hours, and using indoor residual spraying. Travelers to endemic areas should take prophylactic medication as prescribed, starting before travel and continuing after leaving the endemic area. Environmental measures include eliminating standing water where mosquitoes breed and using larvicides in water bodies.</p>

<h3>Treatment of Malaria</h3>
<p>Malaria is a treatable disease when diagnosed promptly and managed appropriately. Uncomplicated malaria is treated with artemisinin-based combination therapies (ACTs) for P. falciparum infections. Other medications include chloroquine for sensitive strains, primaquine for the liver stage of P. vivax and P. ovale, and doxycycline or clindamycin as alternatives. Severe malaria requires intravenous artesunate or quinine in a hospital setting. Treatment should be started within 24 hours of symptom onset for best outcomes.</p>

<h3>When to See a Doctor</h3>
<p>Seek immediate medical attention if you develop fever, chills, headache, or flu-like symptoms after traveling to a malaria-endemic area, even if you took prophylactic medication. Early diagnosis through blood smear microscopy or rapid diagnostic tests is critical. Inform your healthcare provider about your travel history, including countries visited, duration of stay, and any preventive measures taken. Pregnant women, young children, and immunocompromised individuals are at higher risk and require particularly prompt evaluation.</p>`,
        iconName: 'Mosquito',
        displayOrder: 1,
    },
    {
        name: 'Diabetes',
        slug: 'diabetes',
        description: 'Diabetes mellitus is a chronic metabolic disorder characterized by elevated blood glucose levels. It results from defects in insulin production, insulin action, or both, and requires comprehensive lifelong management.',
        content: `<h2>Diabetes</h2>
<p>Diabetes mellitus is a chronic condition that affects how the body converts food into energy. The body either does not produce enough insulin or cannot effectively use the insulin it produces, leading to elevated blood sugar levels that can cause serious health complications over time.</p>

<h3>Symptoms of Diabetes</h3>
<p>Common symptoms of diabetes include increased thirst (polydipsia), frequent urination (polyuria), increased hunger (polyphagia), unexplained weight loss, fatigue, blurred vision, slow-healing sores, frequent infections, and tingling or numbness in the hands or feet. Type 1 diabetes symptoms often appear suddenly, while type 2 diabetes symptoms develop gradually and may be subtle for years. Some people with prediabetes or early type 2 diabetes may have no symptoms at all.</p>

<h3>Prevention of Diabetes</h3>
<p>Type 1 diabetes cannot be prevented with current knowledge. However, type 2 diabetes can often be prevented or delayed through lifestyle modifications. Maintain a healthy body weight through balanced nutrition and regular physical activity. A diet rich in whole grains, fruits, vegetables, lean proteins, and healthy fats reduces risk. Limit sugary beverages and processed foods. Engage in at least 150 minutes of moderate-intensity aerobic activity weekly. Regular screening for prediabetes is recommended for adults with risk factors such as family history, overweight, or sedentary lifestyle.</p>

<h3>Treatment of Diabetes</h3>
<p>Diabetes management requires a comprehensive approach. Type 1 diabetes requires lifelong insulin therapy administered through injections or an insulin pump. Type 2 diabetes management begins with lifestyle modifications and may progress to oral medications (metformin being first-line) and eventually insulin therapy. All people with diabetes benefit from regular blood glucose monitoring, healthy meal planning, regular physical activity, and medication adherence. Blood sugar targets, medication adjustments, and management of complications require ongoing medical supervision.</p>

<h3>When to See a Doctor</h3>
<p>Consult a healthcare provider if you experience symptoms of diabetes, have risk factors including family history or obesity, or are over 35 years old. Regular screening is important as early diabetes may be asymptomatic. People with diabetes should have regular check-ups including A1C testing every 3-6 months, annual eye exams, foot examinations, kidney function tests, and cholesterol monitoring. Seek immediate care for blood sugar above 600 mg/dL, persistent vomiting, fruity breath odor (signs of diabetic ketoacidosis), or severe hypoglycemia.</p>`,
        iconName: 'Activity',
        displayOrder: 2,
    },
    {
        name: 'Hypertension',
        slug: 'hypertension',
        description: 'Hypertension, or high blood pressure, is a common cardiovascular condition where the force of blood against artery walls is consistently too high. It is a major risk factor for heart disease, stroke, and kidney disease.',
        content: `<h2>Hypertension</h2>
<p>Hypertension, commonly known as high blood pressure, is a condition where the force of blood pushing against artery walls is consistently elevated. It is often called the silent killer because it typically has no symptoms until significant damage has occurred.</p>

<h3>Symptoms of Hypertension</h3>
<p>Most people with hypertension have no symptoms, even when blood pressure readings reach dangerously high levels. A few people may experience headaches, shortness of breath, nosebleeds, or flushing, but these symptoms are not specific and usually do not occur until blood pressure reaches severe or life-threatening levels. This is why regular blood pressure screening is essential. Malignant hypertension, a medical emergency, can cause severe headache, vision changes, chest pain, and difficulty breathing.</p>

<h3>Prevention of Hypertension</h3>
<p>Preventing hypertension involves adopting heart-healthy lifestyle habits. Reduce sodium intake to less than 2,300 mg per day (ideally 1,500 mg). Follow the DASH diet rich in fruits, vegetables, whole grains, and low-fat dairy products while limiting saturated fat and cholesterol. Maintain a healthy body weight, as even modest weight loss can reduce blood pressure. Engage in regular aerobic physical activity for at least 30 minutes most days. Limit alcohol consumption to moderate levels. Manage stress through relaxation techniques and adequate sleep.</p>

<h3>Treatment of Hypertension</h3>
<p>Treatment begins with lifestyle modifications, which can be as effective as medication for some people. When lifestyle changes alone are insufficient, medications are prescribed based on the severity and individual patient factors. First-line medications include thiazide diuretics, ACE inhibitors, ARBs, and calcium channel blockers. Most patients require two or more medications to achieve target blood pressure goals. Treatment is typically lifelong, and adherence to the prescribed regimen is essential. Home blood pressure monitoring helps track progress and identify medication effectiveness.</p>

<h3>When to See a Doctor</h3>
<p>Adults should have their blood pressure checked at least every 1-2 years, or more frequently if they have risk factors. Seek medical evaluation if you have a family history of hypertension, are overweight, or are over 40. If you experience severe headache, chest pain, shortness of breath, vision changes, or nosebleeds, check your blood pressure immediately. A reading above 180/120 mmHg requires emergency medical attention. For consistently elevated readings (above 130/80), schedule an appointment with your healthcare provider for evaluation and management.</p>`,
        iconName: 'Heart',
        displayOrder: 3,
    },
    {
        name: 'Asthma',
        slug: 'asthma',
        description: 'Asthma is a chronic respiratory disease characterized by inflammation and narrowing of the airways. It causes recurring episodes of wheezing, chest tightness, shortness of breath, and coughing.',
        content: `<h2>Asthma</h2>
<p>Asthma is a chronic condition affecting the airways that carry air to and from the lungs. In people with asthma, the airways are persistently inflamed and can become temporarily narrowed during an asthma attack, making breathing difficult.</p>

<h3>Symptoms of Asthma</h3>
<p>Asthma symptoms vary from person to person and may include shortness of breath, chest tightness or pain, wheezing (a whistling sound when exhaling), and coughing that worsens at night or early morning. Symptoms may flare up during exercise (exercise-induced bronchoconstriction), in response to allergens, during respiratory infections, or when exposed to cold air or irritants. Some people experience symptoms only during certain seasons, while others have persistent symptoms requiring daily management.</p>

<h3>Prevention of Asthma</h3>
<p>While asthma cannot be prevented, attacks can be minimized by avoiding triggers and maintaining good asthma control. Common triggers include allergens (pollen, dust mites, mold, pet dander), respiratory infections, air pollution, tobacco smoke, strong odors, weather changes, stress, and certain medications. Use allergen-proof covers on bedding, maintain low indoor humidity, keep windows closed during high pollen seasons, avoid smoking and secondhand smoke, and get annual influenza and pneumonia vaccinations to prevent respiratory infections that can trigger attacks.</p>

<h3>Treatment of Asthma</h3>
<p>Asthma treatment follows a stepwise approach based on severity. Controller medications, primarily inhaled corticosteroids, are used daily to reduce airway inflammation and prevent symptoms. Long-acting bronchodilators are added when corticosteroids alone are insufficient. Rescue inhalers (short-acting beta-agonists) provide rapid relief during acute attacks. Biologic therapies target specific inflammatory pathways for severe asthma. An asthma action plan, developed with your healthcare provider, outlines daily management and steps to take during worsening symptoms or attacks.</p>

<h3>When to See a Doctor</h3>
<p>Anyone with symptoms suggestive of asthma should see a doctor for diagnosis and treatment planning. People with diagnosed asthma should have regular follow-up appointments every 3-6 months to assess control and adjust treatment. Seek emergency care if you experience severe shortness of breath, cannot speak in full sentences, have blue lips or fingernails, or if rescue medication does not relieve symptoms. A peak flow meter reading below 50% of personal best requires immediate medical attention.</p>`,
        iconName: 'Lungs',
        displayOrder: 4,
    },
    {
        name: "Women's Health",
        slug: 'women-health',
        description: "Women's health encompasses a broad range of health considerations specific to female biology, including reproductive health, hormonal balance, pregnancy, and conditions that disproportionately affect women.",
        content: `<h2>Women's Health</h2>
<p>Women's health covers the unique health needs and conditions that affect women throughout their lives. From reproductive health and pregnancy to menopause and gender-specific conditions, comprehensive women's healthcare requires specialized knowledge and preventive care.</p>

<h3>Symptoms and Conditions</h3>
<p>Common women's health concerns include menstrual disorders (irregular periods, heavy bleeding, painful periods), polycystic ovary syndrome (PCOS), endometriosis, uterine fibroids, menopause symptoms, urinary tract infections, pelvic floor disorders, breast health issues, and pregnancy-related conditions. Women are also at increased risk for certain conditions including autoimmune diseases, osteoporosis, depression, and thyroid disorders. Symptoms vary widely depending on the condition but may include pelvic pain, abnormal bleeding, hormonal changes, and reproductive health concerns.</p>

<h3>Prevention in Women's Health</h3>
<p>Preventive care is fundamental to women's health. Regular gynecological examinations including Pap smears and pelvic exams detect early signs of cervical cancer and other reproductive tract conditions. Breast self-awareness and mammography screening facilitate early detection of breast cancer. HPV vaccination prevents cervical cancer. Folic acid supplementation before and during pregnancy prevents neural tube defects. Regular bone density screening for postmenopausal women identifies osteoporosis early. A balanced diet rich in calcium and iron, weight-bearing exercise, and avoidance of tobacco and excessive alcohol support lifelong health.</p>

<h3>Treatment of Women's Health Conditions</h3>
<p>Treatment approaches depend on the specific condition and may include hormonal therapies (contraceptives, hormone replacement therapy), surgical interventions (fibroid removal, hysterectomy), fertility treatments, medications for conditions like PCOS and endometriosis, and lifestyle modifications. Each treatment plan should be individualized based on the woman's age, health goals, and preferences. Shared decision-making between patient and healthcare provider is essential for optimal outcomes.</p>

<h3>When to See a Doctor</h3>
<p>Women should have annual well-woman examinations starting at age 21 or earlier if sexually active. Seek medical attention for abnormal vaginal bleeding, pelvic pain, breast lumps or changes, symptoms of menopause that interfere with quality of life, painful periods, difficulty conceiving, or any changes in menstrual patterns. Pregnant women require regular prenatal care throughout pregnancy. Urgent evaluation is needed for severe pelvic pain, heavy bleeding, or signs of ectopic pregnancy.</p>`,
        iconName: 'Venus',
        displayOrder: 5,
    },
    {
        name: 'Child Health',
        slug: 'child-health',
        description: 'Child health focuses on the physical, mental, and social wellbeing of children from infancy through adolescence. It encompasses preventive care, growth monitoring, immunizations, and management of childhood illnesses.',
        content: `<h2>Child Health</h2>
<p>Child health is the foundation for lifelong wellbeing. Pediatric care focuses on ensuring optimal growth and development, preventing disease through vaccination and healthy habits, and promptly treating childhood illnesses and conditions.</p>

<h3>Symptoms of Common Childhood Conditions</h3>
<p>Children commonly experience respiratory infections (colds, bronchiolitis, pneumonia), gastrointestinal infections (vomiting, diarrhea), ear infections, skin conditions (rashes, eczema), fever, allergic reactions, and growth-related issues. Warning signs that warrant medical evaluation include high fever (especially in infants under 3 months), difficulty breathing, lethargy, dehydration (dry mouth, no tears, reduced urine output), severe pain, stiff neck, rash that does not blanch, and seizures. Parents should trust their instincts and seek care when concerned.</p>

<h3>Prevention in Child Health</h3>
<p>Preventive pediatric care includes adhering to the recommended immunization schedule, attending regular well-child check-ups for growth and developmental monitoring, practicing proper nutrition from breastfeeding through adolescence, ensuring adequate sleep and physical activity, childproofing the home to prevent injuries, practicing sun safety, and teaching good hygiene habits. Car seat safety, helmet use during biking, and supervision around water prevent common childhood injuries. Developmental screening identifies delays early for intervention.</p>

<h3>Treatment of Childhood Illnesses</h3>
<p>Treatment depends on the specific condition but generally emphasizes supportive care for viral illnesses (rest, hydration, fever management), antibiotics for bacterial infections, and condition-specific treatments for chronic conditions like asthma or allergies. Children's medications are dosed by weight, not age, and parents should always use appropriate measuring devices. Over-the-counter medications should be used cautiously and according to age guidelines. Chronic conditions benefit from coordinated care with pediatric specialists.</p>

<h3>When to See a Doctor</h3>
<p>Newborns should see a pediatrician within 3-5 days of birth and follow the recommended well-child visit schedule. Seek immediate care for fever in an infant under 3 months, difficulty breathing, signs of dehydration, severe allergic reaction, head injury with loss of consciousness, or suspected poisoning. For non-emergency concerns such as persistent symptoms, developmental concerns, behavioral issues, or routine check-ups, schedule an appointment with your pediatrician.</p>`,
        iconName: 'Baby',
        displayOrder: 6,
    },
    {
        name: 'Arthritis',
        slug: 'arthritis',
        description: 'Arthritis is inflammation of one or more joints, causing pain, stiffness, and reduced mobility. It encompasses over 100 different types of rheumatic conditions affecting people of all ages.',
        content: `<h2>Arthritis</h2>
<p>Arthritis is a common condition characterized by joint inflammation, pain, and stiffness. While often associated with aging, arthritis can affect people of all ages, including children. The two most common forms are osteoarthritis and rheumatoid arthritis.</p>

<h3>Symptoms of Arthritis</h3>
<p>Common arthritis symptoms include joint pain, stiffness (especially in the morning or after periods of inactivity), swelling, redness, and decreased range of motion. Osteoarthritis symptoms typically develop gradually and affect weight-bearing joints like knees, hips, and spine, as well as hands and fingers. Rheumatoid arthritis often affects joints symmetrically (both hands or both knees) and may cause systemic symptoms including fatigue, low-grade fever, and weight loss. Psoriatic arthritis combines joint symptoms with skin psoriasis. Gout causes sudden, severe attacks of pain in a single joint, often the big toe.</p>

<h3>Prevention of Arthritis</h3>
<p>While some risk factors for arthritis (age, genetics, gender) cannot be modified, several strategies can reduce risk or delay onset. Maintaining a healthy body weight reduces stress on weight-bearing joints. Regular low-impact exercise strengthens muscles around joints and maintains flexibility. Avoiding joint injuries through proper technique during sports and using ergonomic equipment helps prevent post-traumatic arthritis. A diet rich in anti-inflammatory foods including omega-3 fatty acids, fruits, vegetables, and whole grains may reduce inflammation. Adequate calcium and vitamin D intake supports bone health.</p>

<h3>Treatment of Arthritis</h3>
<p>Arthritis treatment aims to reduce pain, improve function, and prevent joint damage. Treatment includes medications (NSAIDs for pain and inflammation, disease-modifying antirheumatic drugs for rheumatoid arthritis, corticosteroids, and biologics for severe autoimmune arthritis), physical therapy to strengthen muscles and maintain range of motion, occupational therapy for adaptive strategies, weight management to reduce joint stress, assistive devices (canes, splints, orthopedic shoes), and in advanced cases, joint replacement surgery. Heat and cold therapy provide symptom relief. Exercise, despite initial discomfort, improves long-term outcomes.</p>

<h3>When to See a Doctor</h3>
<p>Consult a healthcare provider if you have joint pain lasting more than a few days, joint swelling, stiffness that limits daily activities, or pain that interferes with sleep. Early diagnosis of inflammatory arthritis like rheumatoid arthritis is crucial to prevent permanent joint damage. Seek prompt attention if a joint appears deformed, is hot and red (signs of infection), or if you have joint pain accompanied by fever or unexplained weight loss.</p>`,
        iconName: 'Bone',
        displayOrder: 7,
    },
    {
        name: 'Heart Disease',
        slug: 'heart-disease',
        description: 'Heart disease refers to several conditions affecting the heart and blood vessels, including coronary artery disease, heart failure, arrhythmias, and valve disorders. It remains the leading cause of death worldwide.',
        content: `<h2>Heart Disease</h2>
<p>Heart disease encompasses a range of cardiovascular conditions that affect the heart's structure and function. Coronary artery disease, the most common type, occurs when plaque buildup narrows the arteries that supply blood to the heart muscle.</p>

<h3>Symptoms of Heart Disease</h3>
<p>Symptoms vary depending on the specific condition. Coronary artery disease may cause chest pain (angina), shortness of breath, palpitations, and fatigue. Heart attacks present with chest discomfort (pressure, squeezing, or fullness), pain radiating to the arm, jaw, or back, cold sweat, nausea, and lightheadedness. Heart failure symptoms include shortness of breath during activity or when lying flat, fatigue, swelling in the legs and ankles, and rapid weight gain from fluid retention. Arrhythmias cause palpitations, dizziness, and fainting. Some people, especially women, may experience atypical symptoms including indigestion and extreme fatigue.</p>

<h3>Prevention of Heart Disease</h3>
<p>Heart disease prevention focuses on managing risk factors through lifestyle modification. Maintain healthy blood pressure, cholesterol, and blood sugar levels through a heart-healthy diet (Mediterranean or DASH diet emphasizing fruits, vegetables, whole grains, lean proteins, and healthy fats). Engage in at least 150 minutes of moderate aerobic activity weekly. Achieve and maintain a healthy body weight. Avoid tobacco products and limit alcohol. Manage stress through relaxation techniques and adequate sleep. Regular health screenings identify risk factors early. Aspirin therapy may be recommended for high-risk individuals.</p>

<h3>Treatment of Heart Disease</h3>
<p>Treatment depends on the specific condition and severity. Lifestyle modifications are foundational. Medications include statins for cholesterol, antihypertensives for blood pressure, antiplatelet agents to prevent clots, beta-blockers and nitrates for angina, and diuretics for heart failure. Surgical interventions include angioplasty and stent placement to open blocked arteries, coronary artery bypass grafting, valve repair or replacement, pacemakers for rhythm disorders, and heart transplantation for end-stage disease. Cardiac rehabilitation programs provide supervised exercise, education, and support.</p>

<h3>When to See a Doctor</h3>
<p>Call emergency services immediately if you experience chest pain with shortness of breath, jaw or arm pain, or cold sweat (potential heart attack). Seek urgent care for chest discomfort, palpitations, fainting, or sudden severe shortness of breath. Regular check-ups are important for people with risk factors including high blood pressure, diabetes, high cholesterol, smoking, family history, or obesity. Preventive cardiology consultation is recommended for those with multiple risk factors.</p>`,
        iconName: 'Heart',
        displayOrder: 8,
    },
    {
        name: 'Digestive Health',
        slug: 'digestive-health',
        description: 'Digestive health encompasses the function of the gastrointestinal tract from the mouth to the colon. Common digestive conditions include acid reflux, irritable bowel syndrome, and inflammatory bowel disease.',
        content: `<h2>Digestive Health</h2>
<p>The digestive system plays a central role in breaking down food, absorbing nutrients, and eliminating waste. Digestive health affects not only gastrointestinal function but also immune health, mental wellbeing, and overall quality of life.</p>

<h3>Symptoms of Digestive Conditions</h3>
<p>Common digestive symptoms include heartburn or acid reflux, abdominal pain or cramping, bloating and gas, nausea and vomiting, diarrhea, constipation, changes in bowel habits, blood in stool, and difficulty swallowing. Specific conditions present with characteristic patterns: GERD causes persistent heartburn and regurgitation. IBS involves abdominal pain with altered bowel habits (diarrhea-predominant, constipation-predominant, or mixed). IBD (Crohn's disease and ulcerative colitis) causes chronic inflammation with diarrhea, abdominal pain, weight loss, and fatigue.</p>

<h3>Prevention of Digestive Problems</h3>
<p>Many digestive conditions benefit from dietary and lifestyle modifications. Eat a high-fiber diet rich in fruits, vegetables, and whole grains to promote regular bowel movements and feed beneficial gut bacteria. Stay hydrated with adequate water intake. Limit fatty, fried, and highly processed foods that can trigger symptoms in sensitive individuals. Eat smaller, more frequent meals to reduce reflux and bloating. Avoid trigger foods identified through an elimination diet for IBS. Manage stress through relaxation techniques, as the gut-brain connection significantly affects digestive function. Regular physical activity promotes bowel regularity.</p>

<h3>Treatment of Digestive Conditions</h3>
<p>Treatment varies by condition. GERD is managed with antacids, H2 blockers, proton pump inhibitors, and lifestyle modifications. IBS treatment includes dietary changes (low FODMAP diet), stress management, fiber supplements, antispasmodics, and gut-directed hypnotherapy. IBD requires anti-inflammatory medications (aminosalicylates), immunomodulators, biologic therapies, and sometimes surgery. Probiotics may help restore gut microbial balance. Chronic constipation responds to increased fiber, hydration, exercise, and sometimes laxatives used appropriately. Peptic ulcers are treated with acid suppression and antibiotics if caused by H. pylori infection.</p>

<h3>When to See a Doctor</h3>
<p>Consult a healthcare provider for persistent digestive symptoms, unintended weight loss, blood in vomit or stool, difficulty swallowing, severe abdominal pain, or changes in bowel habits lasting more than several weeks. Colorectal cancer screening is recommended starting at age 45 for average-risk individuals. Seek emergency care for severe abdominal pain with fever, vomiting blood, bloody diarrhea, or signs of bowel obstruction (severe pain, vomiting, abdominal distension, inability to pass gas).</p>`,
        iconName: 'Stomach',
        displayOrder: 9,
    },
    {
        name: 'Respiratory Infections',
        slug: 'respiratory-infections',
        description: 'Respiratory infections affect the upper or lower respiratory tract and are among the most common reasons for medical visits. They range from mild colds to serious conditions like pneumonia.',
        content: `<h2>Respiratory Infections</h2>
<p>Respiratory infections are illnesses caused by viruses or bacteria that affect the respiratory tract. Upper respiratory infections involve the nose, sinuses, pharynx, and larynx, while lower respiratory infections affect the trachea, bronchi, and lungs. They are the most common reason for healthcare visits and antibiotic prescriptions.</p>

<h3>Symptoms of Respiratory Infections</h3>
<p>Symptoms depend on the specific infection. The common cold presents with runny or stuffy nose, sneezing, sore throat, and cough. Influenza causes sudden onset of high fever, body aches, headache, fatigue, and dry cough. Sinusitis involves facial pain and pressure, thick nasal discharge, and headache. Bronchitis causes productive cough, chest discomfort, and wheezing. Pneumonia presents with fever, chills, productive cough, pleuritic chest pain, and shortness of breath. COVID-19 may include fever, cough, loss of taste or smell, and shortness of breath. Warning signs requiring urgent evaluation include difficulty breathing, chest pain, confusion, and high fever not responding to medication.</p>

<h3>Prevention of Respiratory Infections</h3>
<p>Prevention strategies include frequent handwashing with soap and water, avoiding close contact with sick individuals, covering coughs and sneezes with your elbow, wearing masks during outbreaks, and staying home when ill. Vaccination prevents influenza and pneumococcal disease and reduces COVID-19 severity. Annual influenza vaccination is recommended for everyone over 6 months of age. Pneumococcal vaccines are recommended for children under 2, adults over 65, and people with certain medical conditions. Adequate sleep, balanced nutrition, and stress management support immune function.</p>

<h3>Treatment of Respiratory Infections</h3>
<p>Most respiratory infections are viral and do not require antibiotics. Treatment focuses on symptom relief: rest, hydration, fever reducers (acetaminophen or ibuprofen), cough suppressants or expectorants, saline nasal sprays, and throat lozenges. Antibiotics are prescribed only for confirmed bacterial infections such as bacterial sinusitis, strep throat, or bacterial pneumonia. Antiviral medications for influenza (oseltamivir) are most effective when started within 48 hours of symptom onset. Severe cases, particularly pneumonia, may require hospitalization for oxygen therapy and intravenous fluids or antibiotics.</p>

<h3>When to See a Doctor</h3>
<p>Seek medical attention if you have difficulty breathing, chest pain, high fever lasting more than 3 days, severe headache, confusion, or symptoms that improve then suddenly worsen. People with chronic conditions (asthma, COPD, diabetes, heart disease), pregnant women, older adults, and immunocompromised individuals should seek care early. For routine cold symptoms without warning signs, rest at home and symptomatic treatment are appropriate. Test for influenza and COVID-19 when symptoms are compatible, as specific treatments are available for both.</p>`,
        iconName: 'Lungs',
        displayOrder: 10,
    },
];
async function seedHealthConcerns(manager) {
    const repo = manager.getRepository(health_concern_orm_entity_1.HealthConcernOrmEntity);
    const existing = await repo.count();
    if (existing > 0) {
        console.log(`Health concerns already seeded (${existing} found), skipping.`);
        return;
    }
    const entities = healthConcerns.map((hc) => {
        const entity = new health_concern_orm_entity_1.HealthConcernOrmEntity();
        entity.name = hc.name;
        entity.slug = hc.slug;
        entity.description = hc.description;
        entity.content = hc.content;
        entity.iconName = hc.iconName;
        entity.displayOrder = hc.displayOrder;
        entity.isActive = true;
        entity.metaTitle = `${hc.name} - Health Information and Resources`;
        entity.metaDescription = hc.description.substring(0, 160);
        return entity;
    });
    await repo.save(entities);
    console.log(`Seeded ${entities.length} health concerns.`);
}
//# sourceMappingURL=seed-health-concerns.js.map
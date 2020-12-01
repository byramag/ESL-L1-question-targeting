/*
 Manages interactions with the Question API on GCP
*/
import { React, useState } from 'react';
import axios from 'axios';

const baseURL = "https://esl-question-generator-qadjhsafva-ue.a.run.app/";
// const baseURL = "http://0.0.0.0:8080/"
// set return values in state

async function getTopics(){
    const response = await axios.get( baseURL + "passages" )
    // console.log(response.data)
    return response.data
}

async function getPassage( topic ){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 'Title': topic, 'NumParagraphs': 0 })
    };
    const response = await fetch(baseURL+'passage', requestOptions);
    const data = await response.json();
    return data;
}

async function getPassageByLen( topic, len ){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 'Title': topic, 'NumParagraphs':len })
    };
    const response = await fetch(baseURL+'passage', requestOptions);
    const data = await response.json();
    return data;
}

async function getNumQuestions( topic, len ){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
            "Title": topic,
            "NumParagraphs": len,
            "NumQuestions": 0,
            "L1Target": "" // no L1 to speed up call
        })
    };
    const response = await fetch(baseURL+'questions', requestOptions);
    const data = await response.json(); 
    return data['Questions'].length
}

async function getQuestions( l1, topic, numP, numQ ){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
            "Title": topic,
            "NumParagraphs": numP,
            "NumQuestions": numQ,
            "L1Target": l1 
        })
    };
    const response = await fetch(baseURL+'questions', requestOptions);
    const data = await response.json(); 
    return data;
    //make request here
    /* {
        "Passage": [
            "The immune system is a system of many biological structures and processes within an organism that protects against disease. To function properly, an immune system must detect a wide variety of agents, known as pathogens, from viruses to parasitic worms, and distinguish them from the organism's own healthy tissue. In many species, the immune system can be classified into subsystems, such as the innate immune system versus the adaptive immune system, or humoral immunity versus cell-mediated immunity. In humans, the blood–brain barrier, blood–cerebrospinal fluid barrier, and similar fluid–brain barriers separate the peripheral immune system from the neuroimmune system which protects the brain.",
            "Disorders of the immune system can result in autoimmune diseases, inflammatory diseases and cancer. Immunodeficiency occurs when the immune system is less active than normal, resulting in recurring and life-threatening infections. In humans, immunodeficiency can either be the result of a genetic disease such as severe combined immunodeficiency, acquired conditions such as HIV/AIDS, or the use of immunosuppressive medication. In contrast, autoimmunity results from a hyperactive immune system attacking normal tissues as if they were foreign organisms. Common autoimmune diseases include Hashimoto's thyroiditis, rheumatoid arthritis, diabetes mellitus type 1, and systemic lupus erythematosus. Immunology covers the study of all aspects of the immune system.",
            "Immunology is a science that examines the structure and function of the immune system. It originates from medicine and early studies on the causes of immunity to disease. The earliest known reference to immunity was during the plague of Athens in 430 BC. Thucydides noted that people who had recovered from a previous bout of the disease could nurse the sick without contracting the illness a second time. In the 18th century, Pierre-Louis Moreau de Maupertuis made experiments with scorpion venom and observed that certain dogs and mice were immune to this venom. This and other observations of acquired immunity were later exploited by Louis Pasteur in his development of vaccination and his proposed germ theory of disease. Pasteur's theory was in direct opposition to contemporary theories of disease, such as the miasma theory. It was not until Robert Koch's 1891 proofs, for which he was awarded a Nobel Prize in 1905, that microorganisms were confirmed as the cause of infectious disease. Viruses were confirmed as human pathogens in 1901, with the discovery of the yellow fever virus by Walter Reed.",
            "The immune system protects organisms from infection with layered defenses of increasing specificity. In simple terms, physical barriers prevent pathogens such as bacteria and viruses from entering the organism. If a pathogen breaches these barriers, the innate immune system provides an immediate, but non-specific response. Innate immune systems are found in all plants and animals. If pathogens successfully evade the innate response, vertebrates possess a second layer of protection, the adaptive immune system, which is activated by the innate response. Here, the immune system adapts its response during an infection to improve its recognition of the pathogen. This improved response is then retained after the pathogen has been eliminated, in the form of an immunological memory, and allows the adaptive immune system to mount faster and stronger attacks each time this pathogen is encountered.",
            "Within the genitourinary and gastrointestinal tracts, commensal flora serve as biological barriers by competing with pathogenic bacteria for food and space and, in some cases, by changing the conditions in their environment, such as pH or available iron. This reduces the probability that pathogens will reach sufficient numbers to cause illness. However, since most antibiotics non-specifically target bacteria and do not affect fungi, oral antibiotics can lead to an \"overgrowth\" of fungi and cause conditions such as a vaginal candidiasis (a yeast infection). There is good evidence that re-introduction of probiotic flora, such as pure cultures of the lactobacilli normally found in unpasteurized yogurt, helps restore a healthy balance of microbial populations in intestinal infections in children and encouraging preliminary data in studies on bacterial gastroenteritis, inflammatory bowel diseases, urinary tract infection and post-surgical infections.",
            "Inflammation is one of the first responses of the immune system to infection. The symptoms of inflammation are redness, swelling, heat, and pain, which are caused by increased blood flow into tissue. Inflammation is produced by eicosanoids and cytokines, which are released by injured or infected cells. Eicosanoids include prostaglandins that produce fever and the dilation of blood vessels associated with inflammation, and leukotrienes that attract certain white blood cells (leukocytes). Common cytokines include interleukins that are responsible for communication between white blood cells; chemokines that promote chemotaxis; and interferons that have anti-viral effects, such as shutting down protein synthesis in the host cell. Growth factors and cytotoxic factors may also be released. These cytokines and other chemicals recruit immune cells to the site of infection and promote healing of any damaged tissue following the removal of pathogens."
        ],
        "Questions": [
            {
                "answer": "disease",
                "answer_index": 115,
                "context": "The immune system is a system of many biological structures and processes within an organism that protects against disease. To function properly, an immune system must detect a wide variety of agents, known as pathogens, from viruses to parasitic worms, and distinguish them from the organism's own healthy tissue. In many species, the immune system can be classified into subsystems, such as the innate immune system versus the adaptive immune system, or humoral immunity versus cell-mediated immunity. In humans, the blood–brain barrier, blood–cerebrospinal fluid barrier, and similar fluid–brain barriers separate the peripheral immune system from the neuroimmune system which protects the brain.",
                "question": "The immune system protects organisms against what?"
            },
            // {
            //     "answer": "prostaglandins",
            //     "answer_index": 324,
            //     "context": "Inflammation is one of the first responses of the immune system to infection. The symptoms of inflammation are redness, swelling, heat, and pain, which are caused by increased blood flow into tissue. Inflammation is produced by eicosanoids and cytokines, which are released by injured or infected cells. Eicosanoids include prostaglandins that produce fever and the dilation of blood vessels associated with inflammation, and leukotrienes that attract certain white blood cells (leukocytes). Common cytokines include interleukins that are responsible for communication between white blood cells; chemokines that promote chemotaxis; and interferons that have anti-viral effects, such as shutting down protein synthesis in the host cell. Growth factors and cytotoxic factors may also be released. These cytokines and other chemicals recruit immune cells to the site of infection and promote healing of any damaged tissue following the removal of pathogens.",
            //     "question": "Eicosanoids include what compounds that result in fever and blood vessel dilation?"
            // },
            // {
            //     "answer": "vaccination",
            //     "answer_index": 1022,
            //     "context": "Pathogens can rapidly evolve and adapt, and thereby avoid detection and neutralization by the immune system; however, multiple defense mechanisms have also evolved to recognize and neutralize pathogens. Even simple unicellular organisms such as bacteria possess a rudimentary immune system, in the form of enzymes that protect against bacteriophage infections. Other basic immune mechanisms evolved in ancient eukaryotes and remain in their modern descendants, such as plants and invertebrates. These mechanisms include phagocytosis, antimicrobial peptides called defensins, and the complement system. Jawed vertebrates, including humans, have even more sophisticated defense mechanisms, including the ability to adapt over time to recognize specific pathogens more efficiently. Adaptive (or acquired) immunity creates immunological memory after an initial response to a specific pathogen, leading to an enhanced response to subsequent encounters with that same pathogen. This process of acquired immunity is the basis of vaccination.",
            //     "question": "The idea of acquired immunity in jawed vertebrates is the basis of what medical treatment?"
            // },
            // {
            //     "answer": "Adaptive (or acquired) immunity",
            //     "answer_index": 779,
            //     "context": "Pathogens can rapidly evolve and adapt, and thereby avoid detection and neutralization by the immune system; however, multiple defense mechanisms have also evolved to recognize and neutralize pathogens. Even simple unicellular organisms such as bacteria possess a rudimentary immune system, in the form of enzymes that protect against bacteriophage infections. Other basic immune mechanisms evolved in ancient eukaryotes and remain in their modern descendants, such as plants and invertebrates. These mechanisms include phagocytosis, antimicrobial peptides called defensins, and the complement system. Jawed vertebrates, including humans, have even more sophisticated defense mechanisms, including the ability to adapt over time to recognize specific pathogens more efficiently. Adaptive (or acquired) immunity creates immunological memory after an initial response to a specific pathogen, leading to an enhanced response to subsequent encounters with that same pathogen. This process of acquired immunity is the basis of vaccination.",
            //     "question": "What is the ability to recognize and adapt to new specific pathogens called?"
            // },
            // {
            //     "answer": "carbohydrates",
            //     "answer_index": 152,
            //     "context": "In humans, this response is activated by complement binding to antibodies that have attached to these microbes or the binding of complement proteins to carbohydrates on the surfaces of microbes. This recognition signal triggers a rapid killing response. The speed of the response is a result of signal amplification that occurs following sequential proteolytic activation of complement molecules, which are also proteases. After complement proteins initially bind to the microbe, they activate their protease activity, which in turn activates other complement proteases, and so on. This produces a catalytic cascade that amplifies the initial signal by controlled positive feedback. The cascade results in the production of peptides that attract immune cells, increase vascular permeability, and opsonize (coat) the surface of a pathogen, marking it for destruction. This deposition of complement can also kill cells directly by disrupting their plasma membrane.",
            //     "question": "Complement proteins bind to what kind of molecules on the surface of microbes in order to elicit an immune response?"
            // },
            // {
            //     "answer": "signal amplification",
            //     "answer_index": 295,
            //     "context": "In humans, this response is activated by complement binding to antibodies that have attached to these microbes or the binding of complement proteins to carbohydrates on the surfaces of microbes. This recognition signal triggers a rapid killing response. The speed of the response is a result of signal amplification that occurs following sequential proteolytic activation of complement molecules, which are also proteases. After complement proteins initially bind to the microbe, they activate their protease activity, which in turn activates other complement proteases, and so on. This produces a catalytic cascade that amplifies the initial signal by controlled positive feedback. The cascade results in the production of peptides that attract immune cells, increase vascular permeability, and opsonize (coat) the surface of a pathogen, marking it for destruction. This deposition of complement can also kill cells directly by disrupting their plasma membrane.",
            //     "question": "The speed of the killing response of the human immune system is a product of what process?"
            // },
            // {
            //     "answer": "catalytic cascade",
            //     "answer_index": 598,
            //     "context": "In humans, this response is activated by complement binding to antibodies that have attached to these microbes or the binding of complement proteins to carbohydrates on the surfaces of microbes. This recognition signal triggers a rapid killing response. The speed of the response is a result of signal amplification that occurs following sequential proteolytic activation of complement molecules, which are also proteases. After complement proteins initially bind to the microbe, they activate their protease activity, which in turn activates other complement proteases, and so on. This produces a catalytic cascade that amplifies the initial signal by controlled positive feedback. The cascade results in the production of peptides that attract immune cells, increase vascular permeability, and opsonize (coat) the surface of a pathogen, marking it for destruction. This deposition of complement can also kill cells directly by disrupting their plasma membrane.",
            //     "question": "What type of cascade results when complement proteins bind to microbes and activate their protease activity?"
            // },
            // {
            //     "answer": "disrupting their plasma membrane",
            //     "answer_index": 929,
            //     "context": "In humans, this response is activated by complement binding to antibodies that have attached to these microbes or the binding of complement proteins to carbohydrates on the surfaces of microbes. This recognition signal triggers a rapid killing response. The speed of the response is a result of signal amplification that occurs following sequential proteolytic activation of complement molecules, which are also proteases. After complement proteins initially bind to the microbe, they activate their protease activity, which in turn activates other complement proteases, and so on. This produces a catalytic cascade that amplifies the initial signal by controlled positive feedback. The cascade results in the production of peptides that attract immune cells, increase vascular permeability, and opsonize (coat) the surface of a pathogen, marking it for destruction. This deposition of complement can also kill cells directly by disrupting their plasma membrane.",
            //     "question": "How can the deposition of compliment kill invader cells directly?"
            // }
        ]
    }*/
}

export { getTopics, getPassage, getNumQuestions, getPassageByLen, getQuestions };
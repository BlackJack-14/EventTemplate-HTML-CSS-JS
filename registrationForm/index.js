const MAX_TEAM_MEMBERS = 10; // Change this value to set the maximum number of team members

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    // Optional: Add active class to nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active')); // Remove from all
    const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updateMemberFields() {
    const numMembers = document.getElementById('num-members').value;
    const memberFields = document.getElementById('member-fields');
    memberFields.innerHTML = ''; // Clear existing fields

    for (let i = 1; i <= numMembers; i++) {
        const label = document.createElement('label');
        label.setAttribute('for', `member${i}`);
        label.textContent = `Member ${i} Name:`;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `member${i}`);
        input.setAttribute('required', 'true');

        const yearLabel = document.createElement('label');
        yearLabel.setAttribute('for', `member${i}-year`);
        yearLabel.textContent = `Member ${i} Year of Study:`;

        const yearInput = document.createElement('input');
        yearInput.setAttribute('type', 'text');
        yearInput.setAttribute('id', `member${i}-year`);
        yearInput.setAttribute('required', 'true');

        memberFields.appendChild(label);
        memberFields.appendChild(input);
        memberFields.appendChild(yearLabel);
        memberFields.appendChild(yearInput);
    }
}

// Populate the number of members dropdown
const numMembersSelect = document.getElementById('num-members');
for (let i = 1; i <= MAX_TEAM_MEMBERS; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    numMembersSelect.appendChild(option);
}

// Initialize with one member field on page load
updateMemberFields();

// Add some CSS for the active class
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background-color: #ddd; /* Example styling */
        color: #333;
    }
`;
document.head.appendChild(style);

function toggleScreenshot() {
    const paymentMethod = document.getElementById('payment-method').value;
    const screenshotUpload = document.getElementById('screenshot-upload');
    const transaction = document.getElementById('transaction-id');
    const transactionLabel = document.getElementById('transaction-id-label');

    if (paymentMethod === 'cash') {
        screenshotUpload.style.display = 'none'; // Hide the upload section
        transaction.style.display = 'none';
        transactionLabel.style.display = 'none';
    } else {
        screenshotUpload.style.display = 'block'; // Show the upload section
    }
}

toggleScreenshot();

function toggleAffiliationFields() {
    const sameCollege = document.getElementById('same-college').value;
    const clubInfo = document.getElementById('club-info');
    const otherCollegeInfo = document.getElementById('other-college-info');

    if (sameCollege === 'yes') {
        clubInfo.style.display = 'block';
        otherCollegeInfo.style.display = 'none';
    } else {
        clubInfo.style.display = 'none';
        otherCollegeInfo.style.display = 'block';
    }
    toggleIDFields(); // Call to properly show/hide ids when same college is selected.
}

function toggleIDFields() {
    const sameClub = document.getElementById('same-club').value;
    const idFields = document.getElementById('id-fields');
    const clubIDField = document.getElementById('club-id-field');

    if (document.getElementById('same-college').value === 'yes') {
        if (sameClub === 'yes') {
            idFields.style.display = 'block';
            clubIDField.style.display = "block";
        } else {
            idFields.style.display = 'block'; // College ID is always shown
            clubIDField.style.display = "none"; // Club ID is hidden
        }
    }
}

async function submitRegistration() {
    const teamName = document.getElementById('team-name').value;
    const numMembers = document.getElementById('num-members').value;
    const members = [];

    for (let i = 1; i <= numMembers; i++) {
        const memberName = document.getElementById(`member${i}`).value;
        const memberYear = document.getElementById(`member${i}-year`).value;
        members.push({ name: memberName, year: memberYear });
    }

    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const teamCategory = document.getElementById('team-category').value;
    const teamLeadCourse = document.getElementById('team-lead-course').value;
    const sameCollege = document.getElementById('same-college').value;
    const sameClub = document.getElementById('same-club').value;

    const data = {
        teamName,
        teamSize: numMembers,
        teamLeadName: members[0].name,
        teamLeadEmail: email,
        teamLeadPhone: contact,
        teamLeadCourse,
        teamLeadYearOfStudy: members[0].year,
        teamLeadUPESStudent: 'Yes',
        teamLeadCollegeName: 'UPES',
        teamLeadSapID: sameCollege === 'yes' ? document.getElementById('college-id').value : '-',
        teamLeadCSAMember: sameClub === 'yes' ? 'Yes' : 'No',
        teamLeadCSAID: sameClub === 'yes' ? document.getElementById('club-id').value : '-',
        members: members.slice(1)
    };

    console.log('Submitting registration data:', data); // Log data being sent

    try {
        const response = await fetch('http://localhost:3000/api/register', { // Update URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Registration successful!');
            showSection('whatsapp');
        } else {
            const errorText = await response.text();
            alert(`Registration failed: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

toggleAffiliationFields();
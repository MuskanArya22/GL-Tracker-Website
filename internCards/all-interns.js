document.addEventListener("DOMContentLoaded", function() {
    // Fetch intern data from backend
    fetch('http://localhost:3000/api/interns')
        .then(response => response.json())
        .then(data => {
            renderAllInterns(data);
            renderInternsList(data);
        })
        .catch(error => console.error('Error fetching interns:', error));

    function renderAllInterns(interns) {
        const container = document.getElementById('all-interns-container');
        container.innerHTML = '';
        
        interns.forEach(intern => {
            const internCard = `
                <div class="col-md-3 mb-4">
                    <div class="intern-card">
                        <div class="intern-image" style="background-image: url('${intern.photo}');"></div>
                        <div class="intern-info">
                            <h3 class="intern-name">${intern.name}</h3>
                            <p>${intern.role}</p>
                            <p>${intern.description}</p>
                        </div>
                        <div class="social-icons">
                            <a href="${intern.linkedin}" class="social-icon"><i class="fab fa-linkedin"></i></a>
                            <a href="${intern.github}" class="social-icon"><i class="fab fa-github"></i></a>
                            <a href="${intern.website}" class="social-icon"><i class="fas fa-globe"></i></a>
                            <a href="${intern.twitter}" class="social-icon"><i class="fab fa-twitter"></i></a>
                            <a href="${intern.companyProfile}" class="social-icon"><i class="fas fa-building"></i></a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += internCard;
        });

        adjustFontSize();
    }

    function adjustFontSize() {
        const internNames = document.querySelectorAll(".intern-name");
        internNames.forEach(function(nameElement) {
            const name = nameElement.textContent.trim();
            if (name.length > 15) {
                nameElement.style.fontSize = "14px";
            } else {
                nameElement.style.fontSize = "18px";
            }
        });
    }

    function renderInternsList(interns) {
        const listContainer = document.getElementById('interns-container-list');
        listContainer.innerHTML = `
            <table class="table-interns">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>LinkedIn</th>
                        <th>GitHub</th>
                        <th>Website</th>
                        <th>Twitter</th>
                        <th>Company Profile</th>
                    </tr>
                </thead>
                <tbody>
                    ${interns.map(intern => `
                        <tr>
                            <td>${intern.name}</td>
                            <td>${intern.role}</td>
                            <td>${intern.description}</td>
                            <td><a href="${intern.linkedin}" target="_blank">LinkedIn</a></td>
                            <td><a href="${intern.github}" target="_blank">GitHub</a></td>
                            <td><a href="${intern.website}" target="_blank">Website</a></td>
                            <td><a href="${intern.twitter}" target="_blank">Twitter</a></td>
                            <td><a href="${intern.companyProfile}" target="_blank">Company Profile</a></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    

    // Toggle between grid and list views
    document.getElementById('toggle-view').addEventListener('click', function() {
        const gridContainer = document.getElementById('all-interns-container');
        const listContainer = document.getElementById('interns-container-list');
        const isGridView = gridContainer.style.display !== 'none';

        if (isGridView) {
            gridContainer.style.display = 'none';
            listContainer.style.display = 'block';
            this.textContent = 'Grid View';
        } else {
            gridContainer.style.display = 'flex';
            listContainer.style.display = 'none';
            this.textContent = 'List View';
        }
    });

    // Show/hide the scroll-up button based on scroll position
    window.addEventListener('scroll', function() {
        const scrollUpBtn = document.getElementById('scrollUpBtn');
        if (window.scrollY > 200) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

    // Scroll to the top when the button is clicked
    document.getElementById('scrollUpBtn').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function showForm(formId) {
        document.querySelectorAll('.contact-form').forEach(form => {
            form.classList.remove('active-form');
        });
        document.getElementById(formId).classList.add('active-form');
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (formId === 'servicesForm') {
            document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        } else {
            document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
        }
    }
});


# Space Shooter

Welcome to the Space Shooter Game, a dynamic Flask and JavaScript-based web application that brings thrilling asteroid-blasting action to your browser. Pilot your spacecraft through asteroid fields and compete for the highest scores on the leaderboard.

![gameplay](https://github.com/user-attachments/assets/1aa605bb-e413-47b8-9290-f405fd2775d9)

![menu1](https://github.com/user-attachments/assets/7a3cd9af-42ae-40a7-92a5-5bd64fccdc81)

![leaderboard](https://github.com/user-attachments/assets/6e766104-5d4c-4c36-8cd1-8b7f4598f539)


## Table Of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Detailed File Descriptions](#usage)
- [Demo](#demo)
- [Contributing](#contributing)
- [Links](#links)
- [License](#license)
## Project Overview

Navigate through space, dodge asteroids, and destroy them to earn points. This game combines simple controls with challenging scenarios that require quick reflexes and strategic planning.
## Features

**Dynamic Gameplay:**

- **Asteroid Fields:** Navigate through and destroy dynamically generated fields of asteroids.
- **Score Tracking:** Compete for high scores which are saved and displayed on a leaderboard.

**Real-Time Leaderboard:**

- **Competitive Play:** See how you rank against other players worldwide with an updating leaderboard.

**Responsive Design:**

- Playable on various devices with tailored controls for desktops and touch devices.

**Technologies Used:**

- **Flask:** Manages backend functionality and serves the game's web pages.
- **MongoDB:** Stores leaderboard scores and player data.
- **JavaScript:** Handles the game's logic and user interactions on the client side.
- **HTML/CSS:** Provides the game's structure and styles.


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need to install the following software:

- Python 3.8 or higher
- Flask
- MongoDB
- Pip (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krookskala/space-shooter
   cd space-shooter

2. **Set up a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt

4. **Set up environment variables**
   ```bash
   cp .env.example .env

5. **Start the application**
   ```bash
   python app.py

6. **Access the game**
   ```bash
   Navigating to http://127.0.0.1:5000 in your web browser

### Docker Deployment
If you prefer to use Docker, you can build and run the game in a container:

1. **Build the Docker image**
   ```bash
   docker build -t space-shooter .

2. **Run the Docker container**
   ```bash
   docker run -p 5000:5000 space-shooter

### Testing
To run the automated tests for this system:

```bash
python -m unittest discover tests

```
## Detailed File Descriptions

- **app.py:** Main Flask application file containing backend routes and game logic.
- **requirements.txt:** Lists all Python libraries required for the project.
- **static/:** Contains CSS and JavaScript files.
- **templates/:** HTML files for the game interface.
## Demo

https://github.com/user-attachments/assets/72ef1433-2292-4145-9452-29bd6e168e4e



## Contributing

Contributions are welcome!

If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

Please make sure to follow the project's code of conduct.

1. **Fork the repository**
2. **Create your feature branch (git checkout -b feature/YourFeature)**
3. **Commit your changes (git commit -am 'Add some feature')**
4. **Push to the branch (git push origin feature/YourFeature)**
5. **Open a pull request**



## Links

[![Gmail](https://img.shields.io/badge/ismailsariarslan7@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](ismailsariarslan7@gmail.com)

[![instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/ismailsariarslan/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ismailsariarslan/)
## License

The code in this repository is licensed under the [MIT License.](https://choosealicense.com/licenses/mit/)

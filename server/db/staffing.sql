CREATE DATABASE staffing;
GO
USE staffing;
GO
IF OBJECT_ID('dbo.users') IS NOT NULL
    DROP TABLE dbo.users;
GO
CREATE TABLE dbo.users (
    id_user INT IDENTITY(1,1) NOT NULL,
    username VARCHAR(30) NOT NULL,
    mail VARCHAR(150) NOT NULL,
    password VARCHAR(60) NOT NULL,
    permission VARCHAR(50) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY CLUSTERED (id_user)
);
GO
SELECT * FROM dbo.users

IF OBJECT_ID('dbo.projects') IS NOT NULL
	DROP TABLE dbo.projects;
GO
CREATE TABLE dbo.projects(
	id_project INT IDENTITY(1,1),
	name_project VARCHAR(50) NOT NULL,
	area_project VARCHAR(50) NOT NULL,
	start_date_project DATE NOT NULL,
	end_date_project DATE NOT NULL,
	hours_estimation INT NOT NULL,
	id_user_admin INT,
	PRIMARY KEY(id_project),
	FOREIGN KEY(id_user_admin) REFERENCES dbo.users(id_user)
);

INSERT INTO dbo.projects(name_project, area_project, start_date_project, end_date_project, hours_estimation, id_user_admin)
VALUES('jump SMG-3', 'Jump', '2023-08-16', '2023-10-16', 720, 2);

SELECT * FROM dbo.projects;
 
IF OBJECT_ID('dbo.employees') IS NOT NULL
	DROP TABLE dbo.employees;
GO
CREATE TABLE dbo.employees(
	id_employee INT IDENTITY(1,1),
	name VARCHAR(30) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	mail VARCHAR(150) NOT NULL,
	used_hours INT NOT NULL,
	free_hours INT NOT NULL,
	total_hours INT NOT NULL,
	company VARCHAR(150),
	PRIMARY KEY (id_employee)
);

IF OBJECT_ID('dbo.project_employees') IS NOT NULL
	DROP TABLE dbo.project_employees;
GO
CREATE TABLE dbo.project_employees(
	id_project_employee INT IDENTITY(1,1),
	id_employee INT,
	id_project INT 
	PRIMARY KEY(id_project_employee)
	FOREIGN KEY(id_employee) REFERENCES dbo.employees(id_employee),
	FOREIGN KEY(id_project) REFERENCES dbo.projects(id_project)
);

IF OBJECT_ID('dbo.skills') IS NOT NULL
	DROP TABLE dbo.skills;
GO
CREATE TABLE dbo.skills(
	id_skill INT IDENTITY(1,1),
	skill_name VARCHAR(50),
	PRIMARY KEY(id_skill)
);

IF OBJECT_ID('dbo.employee_skills') IS NOT NULL
	DROP TABLE dbo.employee_skills;
GO
CREATE TABLE dbo.employee_skills(
	id_employee_skill INT IDENTITY(1,1),
	employee_id INT,
	skill_id INT,
	PRIMARY KEY(id_employee_skill),
	FOREIGN KEY (employee_id) REFERENCES dbo.employees(id_employee),
	FOREIGN KEY (skill_id) REFERENCES dbo.skills(id_skill)
);

INSERT INTO dbo.project_employees(id_employee, id_project)VALUES(1,2),(2,3),(1,3)
INSERT INTO dbo.employees(name, lastname, mail, used_hours, free_hours, total_hours, company)VALUES('diego','suarez', 'dieguito@hotmail.com',120, 40, 160, 'Banco Galicia');
INSERT INTO dbo.skills(skill_name)VALUES('CSS'),('Javascript'),('React'),('Node'),('SQL')
INSERT INTO dbo.employee_skills(employee_id, skill_id)VALUES(2,1),(2,2),(2,3),(1,4),(1,5),(1,6)

SELECT * FROM dbo.projects
GO
SELECT * FROM dbo.employees
GO
SELECT * FROM dbo.project_employees
GO
SELECT * FROM dbo.skills
GO
SELECT * FROM dbo.employee_skills

SELECT * FROM dbo.project_employees WHERE id_project = 2;
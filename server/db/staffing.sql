﻿CREATE DATABASE staffing;
GO
USE staffing;
GO

IF OBJECT_ID('dbo.employee_skills') IS NOT NULL
    DROP TABLE dbo.employee_skills;
GO
IF OBJECT_ID('dbo.skills') IS NOT NULL
    DROP TABLE dbo.skills;
GO
IF OBJECT_ID('dbo.project_employees') IS NOT NULL
    DROP TABLE dbo.project_employees;
GO

IF OBJECT_ID('dbo.projects') IS NOT NULL
    DROP TABLE dbo.projects;
GO
IF OBJECT_ID('dbo.users') IS NOT NULL
    DROP TABLE dbo.users;
GO
IF OBJECT_ID('dbo.employees') IS NOT NULL
    DROP TABLE dbo.employees;
GO

IF OBJECT_ID('dbo.employees') IS NOT NULL
	DROP TABLE dbo.employees;
GO
CREATE TABLE dbo.employees(
	id_employee INT IDENTITY(1,1),
	name VARCHAR(30) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	mail VARCHAR(150) NOT NULL,
	role VARCHAR(150) NOT NULL,
	used_hours INT NOT NULL,
	free_hours INT NOT NULL,
	total_hours INT NOT NULL,
	company VARCHAR(150),
	PRIMARY KEY (id_employee)
);
GO
IF OBJECT_ID('dbo.users') IS NOT NULL
    DROP TABLE dbo.users;
GO
CREATE TABLE dbo.users (
    id_user INT IDENTITY(1,1) NOT NULL,
	id_employee INT,
    username VARCHAR(30) NOT NULL,
    mail VARCHAR(150) NOT NULL,
    password VARCHAR(60) NOT NULL,
    permission VARCHAR(50) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY CLUSTERED (id_user),
	FOREIGN KEY(id_employee) REFERENCES dbo.employees(id_employee)
);
GO



IF OBJECT_ID('dbo.projects') IS NOT NULL
	DROP TABLE dbo.projects;
GO
CREATE TABLE dbo.projects(
	id_project INT IDENTITY(1,1),
	name_project VARCHAR(50) NOT NULL,
	area_project VARCHAR(50) NOT NULL,
	leader INT,
	start_date_project DATE NOT NULL,
	end_date_project DATE NOT NULL,
	hours_estimation INT NOT NULL,
	assigned_hours INT NOT NULL DEFAULT 0,
	id_user_admin INT,
	PRIMARY KEY(id_project),
	FOREIGN KEY(id_user_admin) REFERENCES dbo.users(id_user)
);
GO

IF OBJECT_ID('dbo.project_employees') IS NOT NULL
	DROP TABLE dbo.project_employees;
GO
CREATE TABLE dbo.project_employees(
	id_project_employee INT IDENTITY(1,1),
	id_employee INT,
	id_project INT,
	hours_assigned_to_project INT,
	PRIMARY KEY(id_project_employee),
	FOREIGN KEY(id_employee) REFERENCES dbo.employees(id_employee),
	FOREIGN KEY(id_project) REFERENCES dbo.projects(id_project)
);
GO

IF OBJECT_ID('dbo.skills') IS NOT NULL
	DROP TABLE dbo.skills;
GO
CREATE TABLE dbo.skills(
	id_skill INT IDENTITY(1,1),
	skill_name VARCHAR(50),
	PRIMARY KEY(id_skill)
);
GO

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
GO

IF OBJECT_ID('dbo.employees_project_history') IS NOT NULL
	DROP TABLE dbo.employees_project_history
GO
CREATE TABLE employees_project_history(
	id_history INT IDENTITY(1,1),
	employee_id INT,
	employee_name VARCHAR(30),
	project_name VARCHAR(50),
	company_name VARCHAR(50),
	PRIMARY KEY(id_history)
);
GO

INSERT INTO dbo.projects(name_project, area_project, leader, start_date_project, end_date_project, hours_estimation, id_user_admin)
VALUES('jump SMG-3', 'Jump', NULL, '2023-08-16', '2023-10-16', 720, 1);
INSERT INTO dbo.projects(name_project, area_project, leader, start_date_project, end_date_project, hours_estimation, id_user_admin)
VALUES('jump SMG-4', 'Jump', NULL, '2023-08-16', '2023-10-16', 720, 1);
INSERT INTO dbo.projects(name_project, area_project, leader, start_date_project, end_date_project, hours_estimation, id_user_admin)
VALUES('jump SMG-4', 'Jump', NULL, '2023-08-16', '2023-10-16', 720, 1);
INSERT INTO dbo.projects(name_project, area_project, leader, start_date_project, end_date_project, hours_estimation, id_user_admin)
VALUES('jump SMG-5', 'Jump', NULL, '2023-08-16', '2023-10-16', 720, 1);

INSERT INTO dbo.employees(name, lastname, mail, role, used_hours, free_hours, total_hours, company)VALUES('juan','suarez', 'juan@hotmail.com','frontend dev',120, 40, 160, 'banco galicia');
INSERT INTO dbo.employees(name, lastname, mail, role, used_hours, free_hours, total_hours, company)VALUES('emanuel','suarez', 'emanuel@hotmail.com', 'qa automation',120, 40, 160, 'banco galicia');
INSERT INTO dbo.employees(name, lastname, mail, role, used_hours, free_hours, total_hours, company)VALUES('santiago','balino', 'santiago@hotmail.com','project manager',120, 40, 160, 'banco galicia');
INSERT INTO dbo.employees(name, lastname, mail, role, used_hours, free_hours, total_hours, company)VALUES('melanie','aquino', 'melanie@hotmail.com','ux ui designer',120, 40, 160, 'banco frances');
INSERT INTO dbo.employees(name, lastname, mail, role, used_hours, free_hours, total_hours, company)VALUES('simon','santillan', 'simon@hotmail.com','project manager',120, 40, 160, 'banco hsbc');

INSERT INTO dbo.skills(skill_name)VALUES('css'),('javascript'),('react'),('node'),('sql')

INSERT INTO dbo.employee_skills(employee_id, skill_id)VALUES(2,1),(2,2),(2,3),(2,4),(2,5)
INSERT INTO dbo.employee_skills(employee_id, skill_id)VALUES(3,1),(3,2),(3,3)
INSERT INTO dbo.employee_skills(employee_id, skill_id)VALUES(4,1),(4,4),(4,5)
INSERT INTO dbo.employee_skills(employee_id, skill_id)VALUES(5,2),(4,4)
INSERT INTO dbo.employee_skills(employee_id, skill_id)VALUES(6,2),(6,4)

GO
SELECT * FROM dbo.employees
GO
SELECT * FROM dbo.users
GO
SELECT * FROM dbo.projects
GO
SELECT * FROM dbo.project_employees
GO
SELECT * FROM dbo.skills
GO
SELECT * FROM dbo.employee_skills
GO


IF OBJECT_ID('dbo.check_project_availability') IS NOT NULL
	DROP PROCEDURE dbo.check_project_availability
GO
CREATE PROCEDURE dbo.check_project_availability
	@selectedProject INT,
	@selectedHours INT,
	@freeHours INT OUTPUT
AS
BEGIN
	DECLARE @result VARCHAR(100)
	
	SET @freeHours = (SELECT hours_estimation FROM dbo.projects WHERE id_project = @selectedProject) - @selectedHours
	IF @freeHours > 0
		BEGIN
			RETURN @freeHours
		END
	ELSE 
		THROW 51000, 'Horas insuficientes para el proyecto', 1;
END
GO
DECLARE @freeHours INT
EXEC dbo.check_project_availability @selectedProject = 1, @selectedHours = 20, @freeHours = @freeHours OUTPUT
SELECT @freeHours AS horas_libres_proyecto




IF OBJECT_ID('dbo.check_employee_availability') IS NOT NULL
	DROP PROCEDURE dbo.check_employee_availability
GO
CREATE PROCEDURE dbo.check_employee_availability
	@employeeId INT,
	@newProjectHoursRequired INT,
	@employeeFreeHoursAfterCheck INT OUTPUT
AS
BEGIN
	DECLARE @employeeFreeHours INT
	DECLARE @result VARCHAR(150)

	SET @employeeFreeHours = (SELECT free_hours FROM employees WHERE id_employee = @employeeId)
	SET @employeeFreeHoursAfterCheck = @employeeFreeHours - @newProjectHoursRequired
	SELECT @employeeFreeHoursAfterCheck

	IF @employeeFreeHoursAfterCheck >= 0
		BEGIN
			RETURN @employeeFreeHoursAfterCheck
		END
	ELSE
		THROW 51000, 'Horas insuficientes para el empleado', 1;
END
GO
DECLARE @employeeFreeHoursAfterCheck INT
EXEC dbo.check_employee_availability @employeeId = 2, @newProjectHoursRequired = 80, @employeeFreeHoursAfterCheck = @employeeFreeHoursAfterCheck OUTPUT
SELECT @employeeFreeHoursAfterCheck AS horas_libres
GO




IF OBJECT_ID('dbo.check_if_employee_is_asigned') IS NOT NULL
	DROP PROCEDURE dbo.check_if_employee_is_asigned
GO
CREATE PROCEDURE dbo.check_if_employee_is_asigned
	@employeeId INT,
	@selectedProject INT,
	@assigned_hours INT,
	@isAsigned INT OUTPUT
AS
BEGIN
	SET @isAsigned = (SELECT COUNT(*) FROM project_employees WHERE id_employee = @employeeId AND id_project = @selectedProject)
	IF @isAsigned = 0
			INSERT INTO dbo.project_employees(id_project, id_employee, hours_assigned_to_project) VALUES(@selectedProject, @employeeId, @assigned_hours)
	RETURN @isAsigned
END
GO




IF OBJECT_ID('dbo.assign_employee_to_project') IS NOT NULL
	DROP PROCEDURE dbo.assign_employee_to_project
GO
CREATE PROCEDURE dbo.assign_employee_to_project
	@selectedProject INT,
	@selectedHours INT,
	@employeeId INT,
	@newProjectHoursRequired INT,
	@freeHours INT OUTPUT,
	@employeeFreeHoursAfterCheck INT OUTPUT
AS
BEGIN
	/* Check project and employee availability */

	EXEC dbo.check_project_availability @selectedProject = @selectedProject, @selectedHours = @selectedHours, @freeHours = @freeHours OUTPUT
	EXEC dbo.check_employee_availability @employeeId = @employeeId, @newProjectHoursRequired = @newProjectHoursRequired, @employeeFreeHoursAfterCheck = @employeeFreeHoursAfterCheck OUTPUT

	IF @freeHours - @selectedHours >= 0 AND @employeeFreeHoursAfterCheck >= 0
		BEGIN
			DECLARE @isAsigned INT
			EXEC dbo.check_if_employee_is_asigned @employeeId = @employeeId, @selectedProject = @selectedProject, @assigned_hours = @newProjectHoursRequired,  @isAsigned = @isAsigned OUTPUT
			IF @isAsigned = 0
				BEGIN
					SELECT 'Empleado asignado al proyecto seleccionado'
					/* UPDATE dbo.projects SET dbo.projects.hours_estimation = @freeHours WHERE dbo.projects.id_project = @selectedProject */
					UPDATE dbo.employees SET dbo.employees.free_hours = @employeeFreeHoursAfterCheck WHERE dbo.employees.id_employee = @employeeId
					/* Agregar assigned_hours a la tabla proyectos */
					UPDATE dbo.projects SET dbo.projects.assigned_hours = dbo.projects.assigned_hours + @newProjectHoursRequired WHERE dbo.projects.id_project = @selectedProject
					/* Agregar update de horas usadas */
					UPDATE dbo.employees SET dbo.employees.used_hours = dbo.employees.total_hours - @employeeFreeHoursAfterCheck WHERE dbo.employees.id_employee = @employeeId
					/* Solo se puede añadir un solo leader - pm del proyecto */
					IF ( SELECT leader FROM projects WHERE id_project = @selectedProject ) IS NULL AND (SELECT role FROM employees WHERE id_employee = @employeeId ) = 'project manager'
						UPDATE dbo.projects SET leader = @employeeId WHERE id_project = @selectedProject 

					INSERT INTO employees_project_history(employee_id, employee_name, project_name, company_name)VALUES(@employeeId, (SELECT name FROM employees WHERE id_employee = @employeeId ), (SELECT name_project FROM projects WHERE id_project = @selectedProject), (SELECT area_project FROM projects WHERE id_project = @selectedProject))

					INSERT INTO employees_project_history(employee_id, employee_name, project_name, company_name)VALUES(@employeeId, (SELECT name FROM employees WHERE id_employee = @employeeId ), (SELECT name_project FROM projects WHERE id_project = @selectedProject), (SELECT area_project FROM projects WHERE id_project = @selectedProject))
				END
			ELSE 
			THROW 51000, 'No se puede a�adir a un empleado que ya haya sido asignado al proyecto seleccionado', 1;
		END
	ELSE
		THROW 51000, 'No hay horas disponibles', 1;
END
GO
DECLARE @freeHours INT
DECLARE @employeeFreeHoursAfterCheck INT
EXEC dbo.assign_employee_to_project @selectedProject = 4, @selectedHours = 2, @employeeId = 3, @newProjectHoursRequired = 5, @freeHours = @freeHours OUTPUT, @employeeFreeHoursAfterCheck = @employeeFreeHoursAfterCheck OUTPUT
GO
SELECT * FROM dbo.project_employees
GO
SELECT * FROM dbo.employees
GO
SELECT * FROM dbo.projects
GO
SELECT * FROM dbo.employees_project_history
SELECT * FROM dbo.employees_project_history
GO
UPDATE dbo.employees SET dbo.employees.free_hours = 40 WHERE dbo.employees.id_employee = 1



IF OBJECT_ID('dbo.remove_employee_from_project') IS NOT NULL
	DROP PROCEDURE dbo.remove_employee_from_project
GO
CREATE PROCEDURE dbo.remove_employee_from_project
	@employeeId INT,
	@selectedProject INT
AS
BEGIN
	DECLARE @isAsigned INT
	/*EXEC dbo.check_if_employee_is_asigned @employeeId = @employeeId, @selectedProject = @selectedProject, @isAsigned = @isAsigned OUTPUT*/
	SET @isAsigned = (SELECT COUNT(*) FROM project_employees WHERE id_employee = @employeeId AND id_project = @selectedProject)
	IF @isAsigned = 1
		BEGIN
			DECLARE @getUsedHoursInProject INT

			SET @getUsedHoursInProject = (SELECT P.hours_assigned_to_project
			FROM employees AS E
			JOIN project_employees AS P
			ON E.id_employee = P.id_employee WHERE P.id_employee = @employeeId AND P.id_project = @selectedProject)
			
			UPDATE dbo.projects SET dbo.projects.assigned_hours = dbo.projects.assigned_hours - @getUsedHoursInProject WHERE dbo.projects.id_project = @selectedProject

			UPDATE dbo.employees SET dbo.employees.used_hours = dbo.employees.used_hours - @getUsedHoursInProject WHERE dbo.employees.id_employee = @employeeId

			UPDATE dbo.employees SET dbo.employees.free_hours = dbo.employees.free_hours + @getUsedHoursInProject WHERE dbo.employees.id_employee = @employeeId

			DELETE FROM dbo.project_employees WHERE id_employee = @employeeId AND id_project = @selectedProject
			IF(SELECT COUNT(id_employee) FROM dbo.employees WHERE id_employee = @employeeId AND role = 'project manager') > 0
				BEGIN
					UPDATE dbo.projects SET leader = NULL WHERE leader = @employeeId AND id_project = @selectedProject
					SELECT 'Project manager removido del proyecto exitosamente'
				END
			ELSE	
				SELECT 'Empleado removido del proyecto exitosamente'
		END
	ELSE
	THROW 51000, 'No hay empleado asignado al proyecto seleccionado', 1;
END
GO
DECLARE @employeeId INT
DECLARE @selectedProject INT
EXEC dbo.remove_employee_from_project @employeeId = 3, @selectedProject = 4
GO
SELECT * FROM dbo.project_employees
GO
SELECT * FROM dbo.projects WHERE id_project = 1
GO
SELECT * FROM dbo.employees WHERE id_employee = 2
GO




IF OBJECT_ID('dbo.getEmployeesFromProject') IS NOT NULL
	DROP PROCEDURE dbo.getEmployeesFromProject
GO
CREATE PROCEDURE dbo.getEmployeesFromProject
	@id_project INT
AS
BEGIN
	SELECT E.id_employee, E.name, E.lastname, E.mail, E.role, E.used_hours
	FROM dbo.employees AS E
	JOIN dbo.project_employees AS P
	ON E.id_employee = P.id_employee WHERE P.id_project = @id_project
END
GO
DECLARE @id_project INT
EXEC dbo.getEmployeesFromProject @id_project = 1


IF OBJECT_ID('dbo.viewFreeEmployes') IS NOT NULL
	DROP PROCEDURE dbo.viewFreeEmployes
GO
CREATE PROCEDURE dbo.viewFreeEmployes
	@selected_project INT
AS
BEGIN
	SELECT E.id_employee, E.name, E.lastname, E.mail, E.role, E.company, E.used_hours, E.free_hours, E.total_hours
	FROM dbo.employees AS E
	LEFT JOIN dbo.project_employees AS PRO
	ON E.id_employee = PRO.id_employee
	LEFT JOIN dbo.projects AS P
	ON PRO.id_project = P.id_project
	WHERE E.free_hours > 0 AND E.id_employee NOT IN (SELECT id_employee FROM project_employees WHERE project_employees.id_project = @selected_project)
	GROUP BY E.id_employee, E.name, E.lastname, E.mail, E.role, E.company, E.used_hours, E.free_hours, E.total_hours

	SELECT E.id_employee, S.skill_name
	FROM skills AS S
	JOIN employee_skills AS EM
	ON S.id_skill = EM.skill_id
	JOIN employees AS E
	ON E.id_employee = EM.employee_id
	GROUP BY S.skill_name, E.id_employee
	ORDER BY E.id_employee

END
GO
DECLARE @selected_project INT
EXEC dbo.viewFreeEmployes @selected_project = 3
SELECT * FROM employees
SELECT * FROM projects
SELECT * FROM project_employees


IF OBJECT_ID('dbo.get_all_info_from_project') IS NOT NULL
	DROP PROCEDURE dbo.get_all_info_from_project
GO
CREATE PROCEDURE dbo.get_all_info_from_project
	@project_id INT
AS
BEGIN
	DECLARE @projectExists INT
	SET @projectExists = (SELECT COUNT(id_project) FROM projects WHERE id_project = @project_id)
	IF @projectExists > 0 
		BEGIN
			SELECT P.id_project, P.name_project, P.area_project, P.start_date_project, P.end_date_project, P.hours_estimation, P.assigned_hours, E.id_employee, E.name, E.lastname, E.mail, E.company, E.total_hours, E.used_hours, E.free_hours
			FROM projects AS P
			LEFT JOIN project_employees AS PRO
			ON P.id_project = PRO.id_project
			LEFT JOIN employees AS E
			ON E.id_employee = PRO.id_employee
			WHERE P.id_project = @project_id
		END
	ELSE
		THROW 51000, 'Proyecto inv�lido', 1
END
GO
DECLARE @project_id INT
EXEC dbo.get_all_info_from_project @project_id = 1

SELECT * FROM dbo.project_employees
GO
SELECT * FROM dbo.projects
GO
SELECT * FROM dbo.employees


IF OBJECT_ID('dbo.getInfo') IS NOT NULL
	DROP PROCEDURE dbo.getInfo
GO
CREATE PROCEDURE dbo.getInfo
	@selectedQuery VARCHAR(25)
AS
BEGIN
	IF @selectedQuery = 'projects-employees' 
		SELECT P.*, E.* 
		FROM dbo.projects AS P
		JOIN dbo.project_employees AS PRO
		ON P.id_project = PRO.id_project
		JOIN dbo.employees AS E
		ON E.id_employee = PRO.id_employee
	ELSE IF @selectedQuery = 'employees-skills'
		SELECT E.*, S.* 
		FROM dbo.employees AS E
		JOIN dbo.employee_skills AS EMP
		ON E.id_employee = EMP.employee_id
		JOIN dbo.skills AS S
		ON S.id_skill = EMP.skill_id
	ELSE IF @selectedQuery = 'projects'
		SELECT * FROM dbo.projects
	ELSE IF @selectedQuery = 'assigned-employees'
		SELECT E.*
		FROM dbo.employees AS E
		WHERE EXISTS(SELECT 1 FROM dbo.project_employees AS PRO WHERE E.id_employee = PRO.id_employee)
	ELSE IF @selectedQuery = 'free-employees'
		SELECT E.*
		FROM dbo.employees AS E
		WHERE NOT EXISTS(SELECT 1 FROM dbo.project_employees AS PRO WHERE E.id_employee = PRO.id_employee)
	ELSE IF @selectedQuery = 'project-manager'
		SELECT  P.*, E.*
		FROM dbo.employees AS E
		JOIN dbo.project_employees AS PRO
		ON E.id_employee = PRO.id_employee
		JOIN projects AS P
		ON PRO.id_project = P.id_project
		WHERE role = 'project manager'
	ELSE 
		THROW 51000, 'Número de búsqueda incorrecto', 1;
END
GO
DECLARE @selectedQuery VARCHAR(25)
EXEC dbo.getInfo @selectedQuery = 'projects-employees'
GO
DELETE FROM projects where id_project = 2
select * from projects

/* Crear usuario únicamente para empleados con rol 'project manager' */
IF OBJECT_ID('dbo.createUser') IS NOT NULL
	DROP PROCEDURE dbo.createUser
GO
CREATE PROCEDURE dbo.createUser
	@username VARCHAR(30),
	@id_employee INT,
	@mail VARCHAR(150),
	@password VARCHAR(60),
	@permission VARCHAR(50)
AS
BEGIN
	DECLARE @isRegistered BIT
	SET @isRegistered = (SELECT COUNT(U.id_employee) FROM dbo.users AS U JOIN dbo.employees AS E ON U.id_employee = E.id_employee WHERE E.id_employee = @id_employee )

	DECLARE @isProjectManager BIT
	SET @isProjectManager = (SELECT COUNT(role) FROM dbo.employees WHERE id_employee = @id_employee AND role = 'project manager')

	IF @isRegistered = 0
		IF @isProjectManager = 1
			INSERT INTO dbo.users(username, id_employee, mail, password, permission) VALUES(@username, @id_employee, @mail, @password, @permission)
		ELSE 
			THROW 51000, 'Error: el empleado solicitado no tiene el rol minimo permitido', 1
	ELSE 
		THROW 51000, 'Error: ya existe una cuenta creada para el empleado solicitado', 1
END
GO
DECLARE @username VARCHAR(30)
DECLARE @id_employee INT
DECLARE @mail VARCHAR(150)
DECLARE @password VARCHAR(60)
DECLARE @permission VARCHAR(50)
GO
EXEC dbo.createUser @username = 'Santiago', @id_employee = 6, @mail = 'santiaguito@hotmail.com', @password = '123asd', @permission = 'project manager'
GO
SELECT * FROM dbo.users
SELECT * FROM dbo.employees

GO
IF OBJECT_ID('dbo.deleteUser') IS NOT NULL
	DROP PROCEDURE dbo.deleteUser
GO
CREATE PROCEDURE dbo.deleteUser
	@id_employee INT
AS
BEGIN
	DECLARE @isAccountCreated BIT
	SET @isAccountCreated = (SELECT COUNT(id_user) FROM dbo.users WHERE id_employee = @id_employee)
	IF @isAccountCreated = 1
		BEGIN
			DELETE FROM dbo.users WHERE id_employee = @id_employee
		END
	ELSE
		THROW 51000, 'Usuario no encontrado', 1
END
GO
DECLARE @id_employee INT
EXEC dbo.deleteUser @id_employee = 4




/* Vista de todos los empleados con su PM */
IF OBJECT_ID('dbo.viewEmployeesInfo') IS NOT NULL
	DROP PROCEDURE dbo.viewEmployeesInfo
GO
CREATE PROCEDURE dbo.viewEmployeesInfo
AS
BEGIN
	SELECT E.*, P.name_project, P.id_project, (SELECT name FROM employees WHERE id_employee = P.leader) AS 'project_manager', PRO.hours_assigned_to_project
	FROM dbo.employees AS E
	LEFT JOIN dbo.project_employees AS PRO
	ON E.id_employee = PRO.id_employee
	LEFT JOIN dbo.projects AS P
	ON PRO.id_project = P.id_project
	WHERE E.id_employee != 1 AND E.role NOT LIKE 'project manager'
END
GO
EXEC dbo.viewEmployeesInfo
GO

IF OBJECT_ID('dbo.getInfoForSelectedPM') IS NOT NULL
	DROP PROCEDURE dbo.getInfoForSelectedPM
GO
CREATE PROCEDURE dbo.getInfoForSelectedPM
	@id_user INT
AS
BEGIN
	IF (SELECT COUNT(id_user) FROM dbo.users WHERE id_user = @id_user) = 1
		BEGIN
			SELECT P.*
			FROM employees AS E
			LEFT JOIN project_employees AS PRO ON E.id_employee = PRO.id_employee
			LEFT JOIN projects AS P ON PRO.id_project = P.id_project
			LEFT JOIN users AS U ON E.id_employee = U.id_employee
			WHERE U.id_user = @id_user

			DECLARE @project_manager_employee_id INT
			SET @project_manager_employee_id = (SELECT id_employee FROM employees WHERE id_employee IN (SELECT id_employee FROM users WHERE id_user = @id_user))

			SELECT * FROM employees WHERE id_employee = @project_manager_employee_id;

			SELECT E.*, PRO.id_project
			FROM employees AS E
			JOIN project_employees AS PRO ON E.id_employee = PRO.id_employee
			JOIN projects AS P ON PRO.id_project = P.id_project
			WHERE P.leader = @project_manager_employee_id AND role != 'project manager'
		END
	ELSE
		THROW 51000, 'Project manager inexistente', 1
END
GO
DECLARE @id_user INT
EXEC dbo.getInfoForSelectedPM @id_user = 2

SELECT * FROM dbo.users
SELECT * FROM dbo.projects
SELECT * FROM dbo.employees
SELECT * FROM dbo.project_employees

/* *************************************************** */
/* SP que me muestra los empleados que no son usuarios */
/* *************************************************** */
IF OBJECT_ID('dbo.viewFreePmEmployees') IS NOT NULL
	DROP PROCEDURE dbo.viewFreePmEmployees
GO
CREATE PROCEDURE dbo.viewFreePmEmployees
AS
BEGIN
	SELECT * FROM employees e WHERE NOT EXISTS (SELECT * FROM users u where e.id_employee = u.id_employee ) and e.role = 'project manager';
END
GO
EXEC dbo.viewFreePmEmployees
GO

DECLARE @id_employee INT
EXEC dbo.deleteUser @id_employee = 4

SELECT * FROM dbo.users;
SELECT * FROM dbo.employees;
GO

IF OBJECT_ID('dbo.employeesWithoutAssignation') IS NOT NULL
	DROP PROCEDURE dbo.employeesWithoutAssignation
GO
CREATE PROCEDURE dbo.employeesWithoutAssignation
AS
BEGIN
	SELECT E.*, P.name_project
	FROM employees AS E
	LEFT JOIN project_employees AS PR ON PR.id_employee = E.id_employee
	LEFT JOIN projects AS P ON P.id_project = PR.id_project
	WHERE PR.id_employee IS NULL OR P.name_project = 'bench' AND E.id_employee != 1
END
GO
EXEC dbo.employeesWithoutAssignation
GO
SELECT * FROM employees
SELECT * FROM project_employees
SELECT * FROM projects



IF OBJECT_ID('dbo.allEmployeesIncludingBench') IS NOT NULL
	DROP PROCEDURE dbo.allEmployeesIncludingBench
GO
CREATE PROCEDURE dbo.allEmployeesIncludingBench
AS
BEGIN
	SELECT E.id_employee, E.name, E.lastname, E.mail, E.role, E.used_hours, E.free_hours, E.total_hours, E.company, P.name_project
	FROM employees AS E
	LEFT JOIN (
		SELECT id_employee, MIN(id_project) AS id_project
		FROM project_employees
		GROUP BY id_employee
	) AS PR ON PR.id_employee = E.id_employee
	LEFT JOIN projects AS P ON P.id_project = PR.id_project
	WHERE E.id_employee != 1
END
GO
EXEC dbo.allEmployeesIncludingBench
GO


/******************************************************/
/* SP que me muestra los datos del lider del proyecto */
/******************************************************/
IF OBJECT_ID('dbo.viewLeaderDataFromSelectedProject') IS NOT NULL
	DROP PROCEDURE dbo.viewLeaderDataFromSelectedProject
GO
CREATE PROCEDURE dbo.viewLeaderDataFromSelectedProject
	@selectedProject INT
AS
BEGIN
	select e.name, e.lastname, e.mail, e.role, e.used_hours, e.free_hours, e.total_hours, e.company 
	from employees as e 
	join project_employees as pr 
	on e.id_employee = pr.id_employee 
	where pr.id_project = @selectedProject and e.id_employee = (select leader from dbo.projects where id_project = @selectedProject);
END

exec dbo.viewLeaderDataFromSelectedProject @selectedProject = 3;
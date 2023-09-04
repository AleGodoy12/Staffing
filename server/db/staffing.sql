CREATE DATABASE staffing;
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
IF OBJECT_ID('dbo.employees') IS NOT NULL
    DROP TABLE dbo.employees;
GO
IF OBJECT_ID('dbo.projects') IS NOT NULL
    DROP TABLE dbo.projects;
GO
IF OBJECT_ID('dbo.users') IS NOT NULL
    DROP TABLE dbo.users;
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
GO

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
GO

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
INSERT INTO dbo.projects(name_project, area_project, start_date_project, end_date_project, hours_estimation, id_user_admin)
VALUES('jump SMG-3', 'Jump', '2023-08-16', '2023-10-16', 720, 1);
INSERT INTO dbo.employees(name, lastname, mail, used_hours, free_hours, total_hours, company)VALUES('diego','suarez', 'dieguito@hotmail.com',120, 40, 160, 'Banco Galicia');
INSERT INTO dbo.project_employees(id_employee, id_project)VALUES(1,1)
INSERT INTO dbo.skills(skill_name)VALUES('CSS'),('Javascript'),('React'),('Node'),('SQL')
INSERT INTO dbo.employee_skills(employee_id, skill_id)VALUES(1,1),(1,2),(1,3),(1,4),(1,5),(1,5)
GO
SELECT * FROM dbo.users
GO
SELECT * FROM dbo.projects
GO
SELECT * FROM dbo.employees
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
			/* SET @result = 'Horas libres para asignar: '+ CONVERT(VARCHAR(10), @freeHours) 
			SELECT @result AS horas_libres */
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

	IF @employeeFreeHoursAfterCheck > 0
		BEGIN
			/* SET @result = 'Las horas libres del empleado son ' + CONVERT(VARCHAR(10), @employeeFreeHours) + ' y, con el nuevo proyecto pasarían a ser un total de ' + CONVERT(VARCHAR(10), @employeeFreeHoursAfterCheck) + ' horas libres restantes.'
			 SELECT @result AS horas_libres_empleado */
			RETURN @employeeFreeHoursAfterCheck
		END
	ELSE
		THROW 51000, 'Horas insuficientes para el empleado', 1;
END
GO
DECLARE @employeeFreeHoursAfterCheck INT
EXEC dbo.check_employee_availability @employeeId = 1, @newProjectHoursRequired = 39, @employeeFreeHoursAfterCheck = @employeeFreeHoursAfterCheck OUTPUT
SELECT @employeeFreeHoursAfterCheck AS horas_libres
GO




IF OBJECT_ID('dbo.check_if_employee_is_asigned') IS NOT NULL
	DROP PROCEDURE dbo.check_if_employee_is_asigned
GO
CREATE PROCEDURE dbo.check_if_employee_is_asigned
	@employeeId INT,
	@selectedProject INT,
	@isAsigned INT OUTPUT
AS
BEGIN
	SET @isAsigned = (SELECT COUNT(*) FROM project_employees WHERE id_employee = @employeeId AND id_project = @selectedProject)
	IF @isAsigned = 0
			INSERT INTO dbo.project_employees(id_project, id_employee) VALUES(@selectedProject, @employeeId)
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
	EXEC dbo.check_employee_availability @employeeId = 1, @newProjectHoursRequired = @newProjectHoursRequired, @employeeFreeHoursAfterCheck = @employeeFreeHoursAfterCheck OUTPUT

	IF @freeHours - @selectedHours >= 0 AND @employeeFreeHoursAfterCheck - @selectedHours >= 0
		BEGIN
			DECLARE @isAsigned INT
			EXEC dbo.check_if_employee_is_asigned @employeeId = @employeeId, @selectedProject = @selectedProject, @isAsigned = @isAsigned OUTPUT
			IF @isAsigned = 0
				BEGIN
					SELECT 'Empleado asignado al proyecto seleccionado'
					UPDATE dbo.projects SET dbo.projects.hours_estimation = @freeHours WHERE dbo.projects.id_project = @selectedProject
					UPDATE dbo.employees SET dbo.employees.free_hours = @employeeFreeHoursAfterCheck WHERE dbo.employees.id_employee = @employeeId
				END
			ELSE 
			THROW 51000, 'No se puede añadir a un empleado que ya haya sido asignado al proyecto seleccionado', 1;
		END
	ELSE
		THROW 51000, 'No hay horas disponibles', 1;
END
GO
DECLARE @freeHours INT
DECLARE @employeeFreeHoursAfterCheck INT
EXEC dbo.assign_employee_to_project @selectedProject = 1, @selectedHours = 5, @employeeId = 1, @newProjectHoursRequired = 5, @freeHours = @freeHours OUTPUT, @employeeFreeHoursAfterCheck = @employeeFreeHoursAfterCheck OUTPUT
GO
SELECT * FROM dbo.project_employees
GO
GO
SELECT * FROM dbo.projects WHERE id_project = 2
GO
SELECT * FROM dbo.employees WHERE id_employee = 1
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
			DELETE FROM dbo.project_employees WHERE id_employee = @employeeId AND id_project = @selectedProject
			SELECT 'Empleado removido del proyecto exitosamente'
		END
	ELSE
	THROW 51000, 'No hay empleado asignado al proyecto seleccionado', 1;
END
GO
DECLARE @employeeId INT
DECLARE @selectedProject INT
EXEC dbo.remove_employee_from_project @employeeId = 1, @selectedProject = 1
SELECT * FROM dbo.project_employees
GO



IF OBJECT_ID('dbo.getEmployeesFromProject') IS NOT NULL
	DROP PROCEDURE dbo.getEmployeesFromProject
GO
CREATE PROCEDURE dbo.getEmployeesFromProject
AS
BEGIN
	SELECT E.id_employee, E.name, E.lastname, E.mail, E.company, E.used_hours
	FROM dbo.employees AS E
	JOIN dbo.project_employees AS P
	ON E.id_employee = P.id_employee
END
GO
EXEC dbo.getEmployeesFromProject
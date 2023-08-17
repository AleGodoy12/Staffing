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
VALUES('jump SMG-3', 'Jump', '2023-08-16', '2023-10-16', 720, 6);

SELECT * FROM dbo.projects;


IF OBJECT_ID('dbo.SP_CHECK_USER') IS NOT NULL
   BEGIN DROP PROCEDURE dbo.SP_CHECK_USER END;
GO
 CREATE PROCEDURE dbo.SP_CHECK_USER
 (@username VARCHAR(30),
  @password VARCHAR(60)
  )
  AS 
  BEGIN
  	DECLARE @userId INT;
  
  SELECT @userId = id_user
  FROM dbo.users
  WHERE username = @username AND password = @password;
 
 IF @userId IS NOT NULL
 BEGIN
 	SELECT id_user, username, mail, permission
 	FROM dbo.users
 	WHERE id_user = @userId
 END 
 ELSE 
 BEGIN 
	 PRINT 'El usuario no existe'; 
	 RETURN
 END
END;

  
EXEC dbo.SP_CHECK_USER 'admin', '12345';

EXEC dbo.SP_CHECK_USER 'visual', '12345';
 

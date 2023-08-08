CREATE DATABASE staffing;

USE staffing;

IF OBJECT_ID('dbo.users') IS NOT NULL
    DROP TABLE dbo.users;

CREATE TABLE dbo.users (
    id_user INT IDENTITY(1,1) NOT NULL,
    username VARCHAR(30) NOT NULL,
    mail VARCHAR(150) NOT NULL,
    password VARCHAR(60) NOT NULL,
    permission VARCHAR(50) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY CLUSTERED (id_user)
);

INSERT INTO dbo.users(username, mail, password, permission)
VALUES('admin', 'admin@gmail.com', '$2y$12$ifVQB0d5q7mTsJQpXvZp8eQ0GQaUHISan.weEd0q8AHac4o4IzZ32', 'administrador')

select * from dbo.users;

IF OBJECT_ID('dbo.SP_CHECK_USER') IS NOT NULL
   BEGIN DROP PROCEDURE dbo.SP_CHECK_USER END;


  --
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
 
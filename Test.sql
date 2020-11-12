
USE mock2

--- Drop the tables

drop table test3.lookup
GO
drop table test3.revision_parents
GO
drop table test3.city_content
GO
drop table test3.person_content
GO
drop table test3.deletes
GO
drop table test3.add_change
GO
drop table test3.merges
GO
drop table test3.city
GO
drop table test3.person 
GO
drop table test3.changes
GO
drop table test3.object_content
GO
drop table test3.object
GO
drop table test3.revision

Drop Schema Test3
GO

-- Create Test3 Schema

CREATE SCHEMA [test3]
GO
	


----- Create the 6 tables

CREATE TABLE [test3].[revision](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [comment] [varchar](30) NOT NULL
) ON [PRIMARY]
GO


CREATE TABLE [test3].[revision_parents](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [revision_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.revision(id),
        [parent_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.revision(id)
) ON [PRIMARY]
GO


CREATE TABLE [test3].[object](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [object_type] [varchar](30) NULL
) ON [PRIMARY]
GO

CREATE TABLE [test3].[object_content](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY
) ON [PRIMARY]
GO

CREATE TABLE [test3].[city](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [object_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.object(id)
) ON [PRIMARY]
GO


CREATE TABLE [test3].[person](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [object_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.object(id)
) ON [PRIMARY]
GO

CREATE TABLE [test3].[city_content](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [content_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.object_content(id),
        [city_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.City(id),
        [name] [varchar](30) NULL
) ON [PRIMARY]
GO


CREATE TABLE [test3].[person_content](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [content_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.object_content(id),
        [person_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.person(id),
	[first_name] [nvarchar](50) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[age] [int] NOT NULL,
        [city_id] [int] FOREIGN KEY REFERENCES test3.City(id)
) ON [PRIMARY]
GO


CREATE TABLE [test3].[changes](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [revision_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.revision(id),
        [comment] [varchar](30) NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [test3].[deletes](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [change_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Changes(id),
        [delete_object_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Object(id)
) ON [PRIMARY]
GO

CREATE TABLE [test3].[add_change](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [change_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Changes(id),
        [change_content_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Object_Content(id)
) ON [PRIMARY]
GO

CREATE TABLE [test3].[merges](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [change_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Changes(id),
        [this_content_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Object_Content(id),
        [other_content_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Object_Content(id),
        [merge_content_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.Object_Content(id),
) ON [PRIMARY]
GO


CREATE TABLE [test3].[lookup](
        [id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [revision_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.revision(id),
        [order_number] [int] NOT NULL,
        [lookup_id] [int] NOT NULL FOREIGN KEY REFERENCES test3.revision(id),
) ON [PRIMARY]
GO






-- Insert the data

--INSERT INTO test3.revision (id, comment) values (0, 'Added Null0');
--INSERT INTO test3.revision (id, comment) values (1, 'Added Null1');
--INSERT INTO test3.revision (id, comment) values (2, 'Added Null2');
--INSERT INTO test3.revision (id, comment) values (3, 'Added Null3');
--INSERT INTO test3.revision (id, comment) values (4, 'Added Null4');
--INSERT INTO test3.revision (id, comment) values (5, 'Added Null5');
--INSERT INTO test3.revision (id, comment) values (6, 'Added Null6');
--INSERT INTO test3.revision (id, comment) values (7, 'Added Null7');
--INSERT INTO test3.revision (id, comment) values (8, 'Added Null8');
--INSERT INTO test3.revision (id, comment) values (9, 'Added Null9');
--INSERT INTO test3.revision (id, comment) values (10, 'Added Null10');
--
--
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (0, 1, 0);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (1, 2, 1);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (2, 3, 1);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (3, 4, 2);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (4, 5, 3);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (5, 6, 2);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (6, 7, 4);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (7, 7, 5);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (8, 8, 6);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (9, 9, 7);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (10, 9, 8);
--INSERT INTO test3.revision_parents (id, revision_id, parent_id) values (11, 10, 9);
--
--
--INSERT INTO test3.object (id, object_type) values (0, null);
--INSERT INTO test3.object (id, object_type) values (1, 'City');
--INSERT INTO test3.object (id, object_type) values (2, 'Person');
--INSERT INTO test3.object (id, object_type) values (3, 'City');
--INSERT INTO test3.object (id, object_type) values (4, 'Person');
--INSERT INTO test3.object (id, object_type) values (5, 'City');
--INSERT INTO test3.object (id, object_type) values (6, 'Person');
--INSERT INTO test3.object (id, object_type) values (7, 'Person');
--INSERT INTO test3.object (id, object_type) values (8, 'Person');
--
--
--INSERT INTO test3.city_content (id, content_id, city_id, name) values (1,1, 1, 'Fort Worth');
--INSERT INTO test3.city_content (id, content_id, city_id, name) values (2,3, 3, 'Dallas');
--INSERT INTO test3.city_content (id, content_id, city_id, name) values (3,5, 5, 'Arlington');
--INSERT INTO test3.city_content (id, content_id, city_id, name) values (4,9, 1, 'Fort Worth');
--INSERT INTO test3.city_content (id, content_id, city_id, name) values (5,12, 1, 'Fort Worth');
--INSERT INTO test3.city_content (id, content_id, city_id, name) values (6,15, 1, 'Fort Worth');
--INSERT INTO test3.city_content (id, content_id, city_id, name) values (7,16, 3, 'Asstown');
--
--
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (1,2, 2, 'Duane', 'Knesek', 25, 1);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (2,4, 4, 'kelley', 'Hughes', 21, 3);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (3,6, 6, 'Michaela', 'Kidd', 21, 5);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (4,7, 7, 'Luis', 'Marrufo', 22, 1);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (5,8, 4, 'Kelley', 'Hughes', 21, 3);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (6,10, 4, 'Kelley', 'Hughes', 21, 3);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (7,11, 8, 'JD', 'Bone', 22, 1);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (8,13, 4, 'Kelley', 'Hughes', 21, 1);
--INSERT INTO test3.person_content (id, content_id, person_id, first_name, last_name, age, city_id) values (9,14, 4, 'Kelley', 'Hughes', 22, 3);
--
--
--INSERT INTO test3.changes (id, revision_id, comment) values (1, 0, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (2, 1, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (3, 1, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (4, 2, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (5, 2, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (6, 3, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (7, 3, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (8, 4, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (9, 4, 'C');
--INSERT INTO test3.changes (id, revision_id, comment) values (10, 5, 'C');
--INSERT INTO test3.changes (id, revision_id, comment) values (11, 5, 'C');
--INSERT INTO test3.changes (id, revision_id, comment) values (12, 6, 'A');
--INSERT INTO test3.changes (id, revision_id, comment) values (13, 6, 'C');
--INSERT INTO test3.changes (id, revision_id, comment) values (14, 7, 'M');
--INSERT INTO test3.changes (id, revision_id, comment) values (15, 8, 'C');
--INSERT INTO test3.changes (id, revision_id, comment) values (16, 8, 'D');
--INSERT INTO test3.changes (id, revision_id, comment) values (17, 9, 'M');
--INSERT INTO test3.changes (id, revision_id, comment) values (18, 10, 'C');
--
--
--INSERT INTO test3.deletes (id, change_id, delete_object_id) values (1,16, 2);
--
--
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (1,1, 0);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (2,2, 1);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (3,3, 2);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (4,4, 3);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (5,5, 4);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (6,6, 5);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (7,7, 6);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (8,8, 7);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (9,9, 8);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (10,10, 9);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (11,11, 10);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (12,12, 11);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (13,13, 12);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (14,15, 14);
--INSERT INTO test3.add_change (id, change_id, change_content_id) values (15,18, 16);
--
--INSERT INTO test3.merges (id, change_id, this_content_id, other_content_id, merge_content_id) values (1,14, 8, 10, 13);
--INSERT INTO test3.merges (id, change_id, this_content_id, other_content_id, merge_content_id) values (2,17, 9, 12, 15);
--
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (0, 0, 0, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (1, 1, 0, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (2, 1, 1, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (3, 2, 0, 2);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (4, 2, 1, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (5, 2, 2, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (6, 3, 0, 3);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (7, 3, 1, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (8, 3, 2, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (9, 4, 0, 4);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (10, 4, 1, 2);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (11, 4, 2, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (12, 4, 3, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (13, 5, 0, 5);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (14, 5, 1, 3);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (15, 5, 2, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (16, 5, 3, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (17, 6, 0, 6);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (18, 6, 1, 2);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (19, 6, 2, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (20, 6, 3, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (21, 7, 0, 7);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (22, 7, 1, 4);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (23, 7, 2, 5);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (24, 7, 3, 2);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (25, 7, 4, 3);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (26, 7, 5, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (27, 7, 6, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (28, 8, 0, 8);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (29, 8, 1, 6);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (30, 8, 2, 2);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (31, 8, 3, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (32, 8, 4, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (33, 9, 0, 9);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (34, 9, 1, 8);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (35, 9, 2, 7);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (36, 9, 3, 6);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (37, 9, 4, 4);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (38, 9, 5, 5);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (39, 9, 6, 2);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (40, 9, 7, 3);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (41, 9, 8, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (42, 9, 9, 0);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (43, 10, 0, 10);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (44, 10, 1, 9);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (45, 10, 2, 8);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (46, 10, 3, 7);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (47, 10, 4, 6);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (48, 10, 5, 4);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (49, 10, 6, 5);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (50, 10, 7, 2);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (51, 10, 8, 3);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (52, 10, 9, 1);
--INSERT INTO test3.lookup (id, revision_id, order_number, lookup_ID) values (53, 10, 10, 0);
--
--
--INSERT INTO test3.city (id, object_id) values (1,1);
--INSERT INTO test3.city (id, object_id) values (2,3);
--INSERT INTO test3.city (id, object_id) values (3,5);
--
--INSERT INTO test3.person (id, object_id) values (1,2);
--INSERT INTO test3.person (id, object_id) values (2,4);
--INSERT INTO test3.person (id, object_id) values (3,6);
--INSERT INTO test3.person (id, object_id) values (4,7);
--INSERT INTO test3.person (id, object_id) values (5,8);
--
--
--INSERT INTO test3.object_content (id) values (0);
--INSERT INTO test3.object_content (id) values (1);
--INSERT INTO test3.object_content (id) values (2);
--INSERT INTO test3.object_content (id) values (3);
--INSERT INTO test3.object_content (id) values (4);
--INSERT INTO test3.object_content (id) values (5);
--INSERT INTO test3.object_content (id) values (6);
--INSERT INTO test3.object_content (id) values (7);
--INSERT INTO test3.object_content (id) values (8);
--INSERT INTO test3.object_content (id) values (9);
--INSERT INTO test3.object_content (id) values (10);
--INSERT INTO test3.object_content (id) values (11);
--INSERT INTO test3.object_content (id) values (12);
--INSERT INTO test3.object_content (id) values (13);
--INSERT INTO test3.object_content (id) values (14);
--INSERT INTO test3.object_content (id) values (15);
--INSERT INTO test3.object_content (id) values (16);


-- Indexes
IF EXISTS (SELECT name from sys.indexes where name = N'INDEX_CITY_OBJECT_ID')
	DROP INDEX INDEX_CITY_OBJECT_ID ON test3.city
GO

CREATE UNIQUE INDEX INDEX_CITY_OBJECT_ID ON test3.city (OBJECT_ID)
GO

IF EXISTS (SELECT name from sys.indexes where name = N'INDEX_PERSON_OBJECT_ID')
	DROP INDEX INDEX_PERSON_OBJECT_ID ON test3.person
GO

CREATE UNIQUE INDEX INDEX_PERSON_OBJECT_ID ON test3.person (OBJECT_ID)
GO

IF EXISTS (SELECT name from sys.indexes where name = N'INDEX_CONTENT_CITY_ID')
	DROP INDEX INDEX_CONTENT_CITY_ID ON test3.city_content
GO

CREATE UNIQUE INDEX INDEX_CONTENT_CITY_ID ON test3.city_content (CONTENT_ID, CITY_ID)
GO

IF EXISTS (SELECT name from sys.indexes where name = N'INDEX_CONTENT_PERSON_ID')
	DROP INDEX INDEX_CONTENT_PERSON_ID ON test3.city_content
GO

CREATE UNIQUE INDEX INDEX_CONTENT_PERSON_ID ON test3.person_content (CONTENT_ID, CITY_ID, person_id)
GO

IF EXISTS (SELECT name from sys.indexes where name = N'INDEX_CHANGE_DELETED_ID')
	DROP INDEX INDEX_CHANGE_DELETED_ID ON test3.deletes
GO

CREATE UNIQUE INDEX INDEX_CHANGE_DELETED_ID ON test3.deletes (CHANGE_ID, DELETE_OBJECT_ID)
GO

IF EXISTS (SELECT name from sys.indexes where name = N'INDEX_CHANGE_CHANGE_CONTENT_ID')
	DROP INDEX INDEX_CHANGE_CHANGE_CONTENT_ID ON test3.add_change
GO

CREATE UNIQUE INDEX INDEX_CHANGE_CHANGE_CONTENT_ID ON test3.add_change (CHANGE_ID, CHANGE_CONTENT_ID)
GO

IF EXISTS (SELECT name from sys.indexes where name = N'INDEX_CHANGE_MERGE_ID')
	DROP INDEX INDEX_CHANGE_MERGE_ID ON test3.merges
GO

CREATE UNIQUE INDEX INDEX_CHANGE_MERGE_ID ON test3.merges (CHANGE_ID, THIS_CONTENT_ID, OTHER_CONTENT_ID, MERGE_CONTENT_ID)
GO

--ALTER TABLE test3.deletes
--   ADD CONSTRAINT PK_deletes_ID PRIMARY KEY(ID, DELETED_ID)
--GO

--ALTER TABLE test3.add_change
--   ADD CONSTRAINT PK_add_change_ID PRIMARY KEY(ID, CHANGED_ID)
--GO

--ALTER TABLE test3.merges
--   ADD CONSTRAINT PK_merge_ID PRIMARY KEY(ID, THIS, OTHER, MERGED)
--GO






















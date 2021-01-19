import os
import shutil
import logging
from doltpy.core import Dolt, DoltException
from doltpy.core.system_helpers import get_logger


def main():
    cleanup()

    repo_path = "."
    repo = Dolt.init(repo_path)
    create_tables(repo)
    create_view(repo)
    commit(repo, "R0 - creating tables, views")

    add_city(repo, "Fort Worth")
    add_person(repo, "Duane", "Knesek", 25, "Fort Worth", 0)
    commit(repo, "R1 - User01")

    add_city(repo, "Dallas")
    add_person(repo, "Kelley", "Hughes", 21, "Dallas", 0)
    commit(repo, "R2 - User02")

    add_city(repo, "Arlington")
    add_person(repo, "Michaela", "Kidd", 22, "Arlington", 0)
    commit(repo, "R3 - User03")

    add_person(repo, "Luis", "Marrufo", 22, "Fort Worth", 0)
    commit(repo, "R4 - User04")

    add_person(repo, "JD", "Bone", 22, "Fort Worth", 0)
    commit(repo, "R5 - User05")

    add_city(repo, "Denver")
    add_person(repo, "Ron", "Rivas", 22, "Denver", 0)
    commit(repo, "R6 - User06")

    add_person(repo, "Jon", "Krzycki", 22, "Denver", 0)
    commit(repo, "R7 - User07")

    add_person(repo, "Randy", "Flint", 22, "Denver", 0)
    commit(repo, "R8 - User08")

    add_city(repo, "Valley Forge")
    add_person(repo, "Sachin", "Patel", 22, "Valley Forge", 0)
    commit(repo, "R9 - User09")

    add_person(repo, "Scott", "Kelley", 22, "Valley Forge", 0)
    commit(repo, "R10 - User10")

    for branch in range(1,11):
        user_branch="User"+str(branch).zfill(2)
        create_branch(repo, user_branch)

    for branch in range(1,11):
        user_branch="User"+str(branch).zfill(2)
        switch_branch(repo, user_branch)
        for revId in range(1,11):
            change_person_revid(repo, "Duane", revId)
            commit(repo, "RevID="+str(revId).zfill(2))

def create_view(repo):
    repo.sql(query='''
        CREATE VIEW PersonView AS 
            select first_name,last_name,age,city.name from person JOIN city on person.city_id=city.id;
    ''', result_format="tabular")

def show_view_status(repo):
    print("Person View")
    repo.sql(query="SELECT * FROM PersonView", result_format="tabular")

def merge_branch(repo, branch_name, message):
    try:
      switch_branch(repo, "master")
      repo.merge(branch_name, message)
    except ValueError as verr:
      print("Merge ValueError", verr)
    except DoltException as derr:
      print("Merge ExceDoltExceptionption", derr)

def diff_branch(repo, branch_name, message):
    try:
      switch_branch(repo, "master")
      repo.diff_branch(branch_name, message)
    except ValueError as verr:
      print("Merge ValueError", verr)
    except DoltException as derr:
      print("Merge ExceDoltExceptionption", derr)

def switch_branch(repo, branch_name):
    repo.checkout(branch_name)

def remove_person(repo, table, condition):
    query = f"DELETE FROM {table} where {condition}"
    repo.sql(query=query, result_format="tabular")

def change_city(repo, column, before, after):
    query = f"UPDATE city SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")

def change_person(repo, column, before, after):
    query = f"UPDATE person SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")

def change_person_revid(repo, person, revision):
    query = f"UPDATE person SET rev_id = {revision} WHERE first_name ='{person}'"
    repo.sql(query=query, result_format="tabular")

def get_city_id_from_name(repo, city_name):
    query = f"SELECT id FROM city where name='{city_name}'"
    results = repo.sql(query, "json")
    city_id = results['rows'][0]['id']
    return city_id

def add_person(repo, first_name, last_name, age, city_name, rev_id):
    city_id = get_city_id_from_name(repo, city_name)
    _add_person_with_id(repo, first_name, last_name, age, city_id, rev_id)

def _add_person_with_id(repo, first_name, last_name, age, city_id, rev_id):
    try:
        add_person.counter += 1
    except AttributeError:
        add_person.counter = 1
    query = f"INSERT INTO person VALUES ({add_person.counter}, '{first_name}', '{last_name}', '{age}', {city_id}, {rev_id})"
    repo.sql(query=query, result_format="tabular")

def add_city(repo, city_name):
    try:
        add_city.counter += 1
    except AttributeError:
        add_city.counter = 1
    query = f"INSERT INTO city VALUES ({add_city.counter}, '{city_name}')"
    repo.sql(query=query, result_format="tabular")

def create_branch(repo, branch_name):
    repo.branch(branch_name)

def add_tables(repo):
    repo.add(['person', 'city', 'dolt_schemas'])

def commit(repo, message):
    add_tables(repo)
    repo.commit(message)
    show_view_status(repo)

def create_tables(repo):
    repo.sql(query='''
        CREATE TABLE city (
            id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name varchar(30) NULL
        );
    ''', result_format="tabular")

    repo.sql(query='''
        CREATE TABLE person (
            id int NOT NULL AUTO_INCREMENT,
            first_name varchar(50) NULL,
            last_name varchar(50) NULL,
            age int NULL,
            city_id int NULL,
            rev_id int NULL,
            PRIMARY KEY (id)
        );
    ''', result_format="tabular")

def cleanup():
    try:
        shutil.rmtree('.dolt')
    except:
        pass

if __name__ == "__main__":
    main()

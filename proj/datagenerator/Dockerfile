FROM python:3.12
WORKDIR /app
COPY pyproject.toml poetry.lock /app/
RUN pip install poetry
RUN poetry install
COPY . /app
ENTRYPOINT ["poetry", "run", "python", "datagenerator/producer.py"]
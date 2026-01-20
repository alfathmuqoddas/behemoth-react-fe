.PHONY: dev build install shell clean

# ===== Config =====
IMAGE      := node:lts-alpine
APP_DIR    := /app
HOST_DIR   := $(CURDIR)
PORT       ?= 5173
TAG        ?= latest
SERVICE_NAME := behemoth-react-fe
REGISTRY     := registry.localhost
FULL_IMAGE   := $(REGISTRY)/$(SERVICE_NAME):$(TAG)

# ===== Helpers =====
define docker_run
	docker run --rm -it \
		-v $(HOST_DIR):$(APP_DIR) \
		-w $(APP_DIR) \
		$(1)
endef

# ===== Targets =====
install:
	$(call docker_run,$(IMAGE) sh -c "npm install")

dev:
	$(call docker_run, \
		-e CHOKIDAR_USEPOLLING=true \
		-p $(PORT):$(PORT) \
		$(IMAGE) sh -c "npm run dev -- --host 0.0.0.0")

build:
	$(call docker_run,$(IMAGE) sh -c "npm run build")

build-images:
	docker build -t $(FULL_IMAGE) .

push-images:
	docker push $(FULL_IMAGE)

run-images:
	docker run -d -p 8080:80 --name $(SERVICE_NAME) $(FULL_IMAGE)

shell:
	$(call docker_run,$(IMAGE) sh)

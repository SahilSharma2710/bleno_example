# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := bleno
### Rules for final target.
LDFLAGS_Debug := \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first \
	-mmacosx-version-min=11.0 \
	-arch arm64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Debug := \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first

LDFLAGS_Release := \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first \
	-mmacosx-version-min=11.0 \
	-arch arm64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Release := \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first

LIBS :=

$(builddir)/bleno.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(builddir)/bleno.node: LIBS := $(LIBS)
$(builddir)/bleno.node: GYP_LIBTOOLFLAGS := $(LIBTOOLFLAGS_$(BUILDTYPE))
$(builddir)/bleno.node: TOOLSET := $(TOOLSET)
$(builddir)/bleno.node:  FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(builddir)/bleno.node
# Add target alias
.PHONY: bleno
bleno: $(builddir)/bleno.node

# Short alias for building this executable.
.PHONY: bleno.node
bleno.node: $(builddir)/bleno.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/bleno.node

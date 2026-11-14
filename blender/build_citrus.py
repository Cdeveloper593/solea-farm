"""SOLEA — stylised citrus branch, built procedurally in Blender (headless).
Exports: public/models/citrus-branch.glb, public/images/citrus-poster.png, blender/citrus-branch.blend
Run: blender -b --python blender/build_citrus.py
"""
import bpy, math, os
from mathutils import Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def mat(name, color, rough=0.55, **kw):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = rough
    for k, v in kw.items():
        if k in bsdf.inputs:
            bsdf.inputs[k].default_value = v
    return m

ORANGE = mat("OrangePeel", (0.82, 0.26, 0.015), 0.62)
ORANGE2 = mat("OrangePeelLight", (0.88, 0.38, 0.02), 0.58)
LEMON = mat("LemonPeel", (0.85, 0.60, 0.01), 0.6)
LEAF = mat("Leaf", (0.05, 0.24, 0.06), 0.5)
LEAF2 = mat("LeafDark", (0.03, 0.16, 0.04), 0.55)
BARK = mat("Bark", (0.23, 0.15, 0.09), 0.85)
PETAL = mat("Blossom", (0.98, 0.96, 0.92), 0.7)
GOLD = mat("Stamen", (0.95, 0.65, 0.05), 0.5)

# ---------- branch (bezier tube) ----------
curve = bpy.data.curves.new("BranchCurve", "CURVE")
curve.dimensions = "3D"
curve.bevel_depth = 0.055
curve.bevel_resolution = 3
sp = curve.splines.new("BEZIER")
pts = [(-1.7, 0, -0.55), (-0.8, 0.05, 0.05), (0.1, -0.04, 0.42), (1.0, 0.04, 0.18), (1.75, 0, -0.28)]
sp.bezier_points.add(len(pts) - 1)
for bp, co in zip(sp.bezier_points, pts):
    bp.co = co
    bp.handle_left_type = bp.handle_right_type = "AUTO"
branch = bpy.data.objects.new("Branch", curve)
bpy.context.collection.objects.link(branch)
branch.data.materials.append(BARK)
bpy.context.view_layer.objects.active = branch
bpy.ops.object.convert(target="MESH")

# ---------- leaf (lens-shaped custom mesh) ----------
def leaf(name, loc, rot, scale, material):
    verts = [(0, 0, 0), (0.16, 0.02, 0.28), (0.10, 0.01, 0.55), (0, 0, 0.78),
             (-0.10, 0.01, 0.55), (-0.16, 0.02, 0.28)]
    faces = [(0, 1, 2, 3, 4, 5)]
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.materials.append(material)
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    ob.rotation_euler = rot
    ob.scale = (scale, scale, scale)
    sol = ob.modifiers.new("solid", "SOLIDIFY")
    sol.thickness = 0.012
    return ob

leaf_specs = [
    ((-1.35, 0.05, -0.28), (0.5, 0.3, -0.7), 1.15, LEAF),
    ((-0.55, -0.06, 0.28), (-0.4, -0.2, 0.9), 1.3, LEAF2),
    ((0.35, 0.06, 0.48), (0.6, 0.1, -1.9), 1.05, LEAF),
    ((1.25, -0.05, 0.12), (-0.5, 0.4, 2.4), 1.25, LEAF2),
    ((1.62, 0.03, -0.18), (0.3, -0.3, -0.4), 0.95, LEAF),
    ((-1.05, -0.04, 0.02), (-0.7, 0.2, 1.6), 0.9, LEAF2),
    ((0.75, 0.05, 0.36), (0.9, -0.2, -2.8), 0.85, LEAF),
]
for i, (loc, rot, s, m) in enumerate(leaf_specs):
    leaf(f"Leaf{i+1}", loc, rot, s, m)

# ---------- fruits ----------
def fruit(name, loc, r, material):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40, ring_count=24, radius=r, location=loc)
    ob = bpy.context.active_object
    ob.name = name
    ob.data.materials.append(material)
    # gentle organic unevenness
    dis = ob.modifiers.new("grain", "DISPLACE")
    tex = bpy.data.textures.new(name + "Tex", "CLOUDS")
    tex.noise_scale = 0.55
    dis.texture = tex
    dis.strength = 0.012
    bpy.ops.object.shade_smooth()
    # stem + navel dot
    bpy.ops.mesh.primitive_cone_add(radius1=0.035, radius2=0.05, depth=0.09,
                                    location=(loc[0], loc[1], loc[2] + r * 0.98))
    stem = bpy.context.active_object
    stem.name = name + "Stem"
    stem.data.materials.append(LEAF2)
    return ob

fruit("OrangeA", (-0.95, 0.02, -0.42), 0.46, ORANGE)
fruit("OrangeB", (0.55, -0.02, 0.05), 0.52, ORANGE2)
fruit("LemonC", (1.45, 0.03, -0.45), 0.40, LEMON)
# lemon tip
bpy.ops.mesh.primitive_cone_add(radius1=0.10, radius2=0.02, depth=0.14,
                                location=(1.45, 0.03, -0.45 - 0.44), rotation=(math.pi, 0, 0))
bpy.context.active_object.data.materials.append(LEMON)

# ---------- blossom ----------
bx, by, bz = -1.55, 0.10, 0.05
for i in range(5):
    a = i * (2 * math.pi / 5)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.09,
                                         location=(bx + 0.10 * math.cos(a), by + 0.10 * math.sin(a), bz))
    p = bpy.context.active_object
    p.scale = (1, 1, 0.35)
    p.data.materials.append(PETAL)
bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.05, location=(bx, by, bz + 0.02))
bpy.context.active_object.data.materials.append(GOLD)

# ---------- camera / lights / poster render ----------
scene.render.engine = "CYCLES"
scene.cycles.samples = 48
scene.render.film_transparent = True
scene.render.resolution_x = 1100
scene.render.resolution_y = 800
world = bpy.data.worlds.new("W")
scene.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (1, 0.97, 0.9, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 0.35

bpy.ops.object.light_add(type="SUN", location=(3, -4, 6))
sun = bpy.context.active_object
sun.data.energy = 2.4
sun.rotation_euler = (math.radians(50), 0, math.radians(35))
bpy.ops.object.light_add(type="AREA", location=(-4, 3, 4))
area = bpy.context.active_object
area.data.energy = 500
area.data.shape = "DISK"
area.data.size = 4

bpy.ops.object.camera_add(location=(0, -4.6, 0.55))
cam = bpy.context.active_object
cam.rotation_euler = (math.radians(84), 0, 0)
cam.data.lens = 52
scene.camera = cam

poster = os.path.join(ROOT, "public", "images", "citrus-poster.png")
scene.render.filepath = poster
bpy.ops.render.render(write_still=True)
print("POSTER", poster)

# ---------- export ----------
os.makedirs(os.path.join(ROOT, "public", "models"), exist_ok=True)
glb = os.path.join(ROOT, "public", "models", "citrus-branch.glb")
bpy.ops.object.select_all(action="SELECT")
# exclude camera/lights from export selection
for ob in (cam, sun, area):
    ob.select_set(False)
bpy.ops.export_scene.gltf(filepath=glb, export_format="GLB", use_selection=True,
                          export_apply=True, export_yup=True)
print("GLB", glb, os.path.getsize(glb))
blend = os.path.join(ROOT, "blender", "citrus-branch.blend")
bpy.ops.wm.save_as_mainfile(filepath=blend)
print("BLEND", blend)
